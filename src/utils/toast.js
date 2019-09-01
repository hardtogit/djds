// eslint-disable-next-line
const domCss = 'position: fixed;left: 50%;top: 50%;width: 100%;height: auto;-webkit-transform: translate(-50%,-50%);z-index: 10000;';
const domCssMask = 'left: 0;top: 0;width: 100%;height:100%;-webkit-transform: translate(0,0)';
const conCss = 'width: 100%;height:100%;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack: center;';
// eslint-disable-next-line
const textCss = 'min-width:1.6rem;max-width: 5.4rem;padding: 0.08rem 0.2rem;text-align: center;color: #fff;font-size: 0.14rem;line-height: 1.5;word-break: break-all;background-color: rgba(58, 58, 58, 0.9);border-radius: 0.04rem;';
const id = 'goblin-toast';
const textId = 'goblin-toast-text';
let dom = null;
let timer = null;

function toast(text = '', time = 3000, mask = false) {
    dom = document.getElementById(id);
    if (!dom) {
        dom = document.createElement('div');
        dom.id = id;
        dom.setAttribute('style', domCss);
        document.body.appendChild(dom);
        dom.innerHTML = `<div style="${conCss}"><div id="${textId}" style="${textCss}">${text}</div></div>`;
    } else {
        clearTimeout(timer);
        const textDom = document.getElementById(textId);
        textDom.innerHTML = text;
    }
    if (mask) {
        // dom.style = domCss + domCssMask;
        dom.setAttribute('style', domCss + domCssMask);
    } else {
        dom.setAttribute('style', domCss);
    }
    timer = setTimeout(() => {
        dom.remove();
        clearTimeout(timer);
    }, time);
}

export default toast;