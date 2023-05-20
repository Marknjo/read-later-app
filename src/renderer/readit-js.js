// const readerButtons = `
// <div class="reader-btn-wrapper" id="readit">
//   <button class="reader-btn-delete" title="Close the window and delete this Readit item">Delete</button>
//   <button class="reader-btn-done" title="Close the window without deleting this Readit">Done</button>
// </div>
// `;

// const readerStyles = `
//     #readit.reader-btn-wrapper {
//       position: fixed;
//       bottom: 2rem;
//       right: 2rem;
//       display: flex;
//       z-index: 99999999;
//     }

//     #readit.reader-btn-wrapper button {
//       text-transform: uppercase;
//       border-radius: 0.5rem;
//       font-size: 1.6rem;
//       outline: none;
//       padding: 1rem 2rem;
//       cursor: pointer;
//       transition: all 0.15s ease-in;
//       box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2),
//         0 0.5rem 1.5rem rgba(0, 0, 0, 0.25);
//     }

//     #readit.reader-btn-wrapper button:visited,
//     #readit.reader-btn-wrapper button:hover {
//       box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.2),
//         0 0.2rem 0.8rem rgba(0, 0, 0, 0.25);
//     }

//     #readit.reader-btn-wrapper button:not(:last-of-type) {
//       margin-right: 1.2rem;
//     }

//     #readit button.reader-btn-delete {
//       font-size: 1.2rem;
//       padding: 2px 1rem;
//       border-radius: 4;
//       font-weight: bold;
//       color: tomato;
//       border: 1px solid tomato;
//       background-color: white;
//     }
//     #readit.reader-btn-delete:visited,
//     #readit.reader-btn-delete:hover {
//       background-color: tomato;
//       color: white;
//     }

//     #readit.reader-btn-done:visited,
//     #readit.reader-btn-done:hover {
//       background-color: rgb(21, 122, 223);
//     }

// `;

// document.addEventListener("DOMContentLoaded", () => {});

// /// add css to the head

// /**
//  *
//  * @param {HTMLHeadElement} headEl
//  * @param {string} styles
//  */
// function attachReaderStyles(headEl, styles) {
//   const stylesEl = document.createElement("style");

//   stylesEl.innerHTML = styles;

//   headEl.appendChild(stylesEl);
// }

// /// add buttons to the UI
// /**
//  *
//  * @param {HTMLHeadElement} bodyEl
//  * @param {HTMLHeadElement} buttons
//  *
//  */
// function attachReaderBtnContainer(bodyEl, buttons) {
//   const wrapper = document.createElement("div");
//   wrapper.innerHTML = buttons;

//   bodyEl.append(wrapper);
// }

// export function getReaderContent(readerWin, contentUrl) {
//   // const docEl = readerWin.document;
//   // // Attache styles
//   // const headEl = docEl.querySelector("head");
//   // attachReaderStyles(headEl, readerStyles);
//   // docEl.write(
//   //   `
//   //   <iframe src="${contentUrl}" title="Read It" class="reader-content"></iframe>
//   //   ${readerButtons}
//   //   `
//   // );
// }
