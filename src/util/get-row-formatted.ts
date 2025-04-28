import { toString, isEmpty } from "lodash";

export const getRowFormatted = (title: string, original: string, changed?: string): string => {
    return `<span class="edit-review-body">
              <span class="edit-review-title">
                    ${title}:
              </span>
               <span class="edit-original-changed">
                   <strike ${ (!isEmpty(toString(changed)) ? "class='edit-review-original'" : "class='edit-review-original-transparent'") }>
                        <span>
                              ${toString(original)}
                        </span>
                    </strike>
                    <span class="edit-review-changed">
                        ${toString(changed)}
                    </span>
               </span>
           </span>`;
};
