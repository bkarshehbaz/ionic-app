import { Component, OnInit, Renderer2, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Logger } from '../../providers/vvs-controller/util/logger';
import { Content, IonicPage, List } from 'ionic-angular';
import { VVSApp } from '../../providers/vvs-controller/vvs-controller';
import { trim, pullAt, get, delay as _delay, includes, cloneDeep, findIndex, groupBy, forEach, isEmpty, values, without, omit } from 'lodash';
import * as cf from '../../constants/constant-fields';
import { getFullName } from '../../util/index';
import { IChat, IChatItemGroup } from "../../lib/vvs-bridge";

import { v4 as uuidv4 } from "uuid";

import { CameraService } from '../../providers/camera-service/camera-service';
import { KeyboardService } from '../../providers/keyboard/keyboard-service';
import { Taptic } from '../../providers/haptic-service';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { getMomentFormats } from '../../constants/constants';
import { RollbarService } from '../../services/rollbar';
import * as cat from '../../constants/event-categories';
import { to } from '../../util/to';
import { Memoize } from 'lodash-decorators';
import { FormControl, Validators } from '@angular/forms';
import { delay, debounceTime, takeWhile } from 'rxjs/operators';

const logger = Logger.get("ChatComponent");

// alexmady/KeyboardTest/
@IonicPage({
	name: "chat"
})
@Component({
    selector: "chat", // tslint:disable-line:component-selector
    templateUrl: "./chat.html",
    changeDetection: ChangeDetectionStrategy.Default
})
export class ChatComponent implements OnInit {

	@ViewChild("photosRow") photosRow;

    // @ViewChild('chat') chat: ElementRef;
	@ViewChild(Content) content: Content;
    @ViewChild(List, {read: ElementRef}) chatList: ElementRef;
	@ViewChild("ionFooter") ionFooter: ElementRef;
	@ViewChild("textArea") textArea: ElementRef;

    public title: string = "Chat";

    ionViewDidEnterCount: number = 0;

    public groups: IChatItemGroup[] = [];

	msgContent = new FormControl('', [ Validators.required, Validators.minLength(1) ]);

    public newMessage: IChat = { msgImage: [], sent: false } as IChat;

	private get textareaElement(): HTMLElement {
		return this.textArea.nativeElement;
	}

	isDestroyed: boolean = false;

	messages: IChat[];

	input = new Subject();
	resizeTextarea = {
		output: () => {
			logger.info("output resizeTextarea");
			this.content.resize();
			this.content.scrollToBottom();
		},
		input: this.input
	};

	constructor(public vvsApp: VVSApp,
				private cdr: ChangeDetectorRef,
				private ngZone: NgZone,
                public renderer: Renderer2) {
		// this.content.scrollToBottom = throttle(this.content.scrollToBottom, 500, { leading: true, trailing: false })
	}

	trackById(index: number, item: IChat) {
        return item && item != null ? item.chatID : null;
    }

    ngOnInit() {

		this.isDestroyed = false;

        this.newMessage = this.createNewMessage();
		// _delay( () => this._ngOnInit(), 200);

		this.msgContent.valueChanges
		.pipe( 
			takeWhile( _ => !this.isDestroyed ),
			debounceTime(300),
		)
		.subscribe(
			data => {
				this.cdr.detectChanges();
			}
		);


		this.vvsApp.lss.getCurrentUserData()
		.then( (userData) => {
			logger.l("userdata >>> ", userData);
		});

		this.getChatData();

		this.vvsApp.reactive.chat
		.subscribe(
			(event) => {
				switch(event.category) {

					case cat.CHAT_NEW_MESSAGE:
						if (event.data.userID != this.vvsApp.userID) {
							this.pushMessageToView(event.data, { sending: false });
						}
						break;
					case cat.CHAT_NEW_MESSAGES:
						this.getChatData();
						break;
				}
			},
			logger.error
		);

	}

	async getChatData() {

		const chatLength = values(this.vvsApp.lss.getRawValue("Chat")).length;

		const [messages, error] = await to<IChat[]>(this._getChatData(chatLength));

		if (messages) {
			this.messages = messages;
		}

	}

	@Memoize()
	async _getChatData(len: number) {

		const [data, error] = await to(this.vvsApp.lss.getChatData());

		if (error) {
			RollbarService.error(error);
			return;
		}

		const messages: IChat[] = [];

		forEach(
			groupBy(
				data,
				(chatMessage: IChat) => moment(chatMessage.createDate).startOf('day').format()
			),
			(val, key) => {
				if (!isEmpty(val)) {
					val[0].dividerDate = moment(key).calendar(null, getMomentFormats());
					messages.push(...val);
				}
			}
		);

		return messages;

	}


    sendMessage(retryChat?: IChat) {

		if (this.msgContent.invalid) {
			return;
		}

		let msg: IChat;

		if (retryChat) {
			msg = cloneDeep(retryChat);
			this.pushMessageToView(msg, { sending: true });
		} else {
			this.newMessage.msgContent = trim(this.msgContent.value);
			// msg = cloneDeep(omit(this.newMessage, 'msgContentInput'));
			msg = cloneDeep(this.newMessage);
			this.newMessage = this.createNewMessage();
			this.vvsApp.lss.insertChat({...msg, sent: false, sending: true});
			this.pushMessageToView(msg, { sending: true });
		}

		this.vvsApp.httpService
		.ChatInsert(msg)
		.subscribe(
			(newMsg: IChat) => {
				logger.info(newMsg);
				this.pushMessageToView(newMsg, { sending: false });
				this.vvsApp.lss.insertChat({...newMsg, sent: true, sending: false});
				this.input.next();
			},
			(error) => {

				const message = get(error, "error.error.message");

				const sending = false;

				if (includes(message, "ER_DUP_ENTRY")) {
					this.vvsApp.lss.insertChat({ ...msg, sent: true, sending });
					this.pushMessageToView(msg, { sending } );
				} else {
					this.vvsApp.lss.insertChat({...msg, sent: false, sending });
					this.pushMessageToView(msg, { sending });
					this.vvsApp.presentSingleAlert("Couldn't send message, retry!");
				}

				logger.error("chat-insert-error", error);
			}
		);

    }

    pushMessageToView(chat: IChat, options: { sending: boolean }) {

		this.ngZone.run( () => {
			const index = findIndex(this.messages, x => x.uuid == chat.uuid);
	
			if (index >= 0) {
				this.messages[index] = chat;
				this.messages[index].sending = options.sending;
				return;
			}
	
			chat.createDate = chat.createDate || new Date();
			chat.sending = options.sending;
	
			this.messages.push(chat);
		})

	}

    createNewMessage(): IChat {
		this.msgContent.setValue('');
        return {
            userID: this.vvsApp.userID,
            fullName: getFullName(this.vvsApp.user),
            msgContent: '',
			// msgContentInput: this.msgContent,
			msgImage: [],
			uuid: uuidv4(),
			createDate: new Date(),
            // initials: getUserInitials(this.vvsApp.user),
			sent: false,
			// index: undefined
        };
    }


	ionViewWillLeave() {
		KeyboardService.showBar();
	}

    ionViewDidLeave() {
		// this.removeKeyboardListeners();
		KeyboardService.showBar();
    }

    ionViewDidEnter() {
		logger.info("ionViewDidEnter");

		// if (this.ionViewDidEnterCount > 0 && values(this.vvsApp.lss.getRawValue("Chat")).length > this.messages.length) {
		// 	this.getChatData();
		// }

		if (this.ionViewDidEnterCount > 0) {
			this.getChatData();
		}
        this.ionViewDidEnterCount++;

		// this.addKeyboardListeners();
		KeyboardService.hideBar();

		this.vvsApp.chatBadge.clear();

		this.vvsApp.httpService.doSync();
	}

	ionViewWillEnter() {
		// this.removeKeyboardListeners();
		KeyboardService.hideBar();
    }

    takePicture() {
		CameraService.takePicture()
		.then( (uri: string) => {
			this.newMessage.msgImage.push({
				uri,
				index: undefined,
				uid: uuidv4(),
				date: moment.utc().toString()
			});


			setTimeout( () => {
				logger.info("this.photosRow", this.photosRow);

				const el = get(this, "photosRow.scrollContent.nativeElement");

				if (el) {
					(el as HTMLElement).scrollBy({
						top: 0,
						left: el.scrollLeft + el.scrollWidth,
						behavior: "smooth"
					});
				}

				this.content.resize();
				this.content.scrollToBottom();

			}, 500);

		})
		.catch(logger.error);
    }

    footerTouchStart(event: TouchEvent&{target:Element}) {
		logger.info("footerTouchStart event", event, event.target.classList);

        if (event.target.localName !== cf.textarea && event.target.localName !== "img") {
            event.preventDefault();
		}

		// hack, using event.target
		const actionTarget = get(event, "target.dataset.action");
		const actionTargetParent = get(event, "target.parentElement.dataset.action");
		if (actionTarget === "remove-photo" || actionTargetParent === "remove-photo") {
			const index = get(event, "target.dataset.index") || get(event, "target.parentElement.dataset.index");
			if (index) {
				pullAt(this.newMessage.msgImage, index);
			}
			return;
		}

		const x = get(event, "target.classList");
		const y = get(event, "target.offsetParent.classList");

		if (includes(x, "footer-action") || includes(y, "footer-action")) {
            event.preventDefault();
		}

	}

    removeKeyboardListeners() {
		KeyboardService.unsubscribe();
    }

    hideKeyboard() {
        KeyboardService.hide();
    }

	// tslint:disable-next-line: member-ordering
	mObserver: MutationObserver;
	ionViewDidLoad() {

        // this.scrollContentElement = this.content.getScrollElement();

		this.mutationObserver = new MutationObserver((mutations) => {
			logger.info("chatList mutation", mutations);
            this.content.scrollToBottom();
        });

        this.mutationObserver.observe(this.chatList.nativeElement, {
            childList: true, subtree: true
		});


		this.mObserver = new MutationObserver((mutations) => {
            this.content.scrollToBottom();
			this.content.resize();
		});

		this.mObserver.observe(this.ionFooter.nativeElement, {
            childList: true, subtree: true
		});
	}

	retry({ event, message }: {event: any, message: IChat}) {
		Taptic.selection();

		logger.info("retry", { event, message });
		this.sendMessage(message);
	}

	_contentMouseDown = false;
    contentMouseDown(event: MouseEvent) {
		logger.info("contentMouseDown");
		this._contentMouseDown = true;
        if (this.textareaElement) {
            this.textareaElement.blur();
        }
    }

    touchSendButton(event: Event) {
		Taptic.light();
		// logger.debug("touchSendButton");
        event.preventDefault();
        this.sendMessage();
    }
    touchTakePicture(event: Event) {
		Taptic.light();
        logger.i("touchTakePicture", event);
        event.preventDefault();
        this.takePicture();
	}
	
	private mutationObserver: MutationObserver;

}
