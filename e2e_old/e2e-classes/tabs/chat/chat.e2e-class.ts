
import { e2eUtil } from "../../util/util.e2e-class";


class ChatSpec {

    runChatSpec() {

        describe("ChatSpec", () => {

            it("Title should be Chat", (done:DoneFn) => {
                e2eUtil.checkTitle("Chat",done);
            });


            it('pause', (done) => {
                done();
            });


        });
    }

}
export const chatSpec = new ChatSpec();
