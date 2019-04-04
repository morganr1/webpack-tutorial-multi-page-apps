import './Image.css';
import Ned from './nedsHead.png'

class Image {
    render() {
        const img = document.createElement('img');
        const body = document.querySelector('body');
        img.src = Ned;
        img.alt = 'neds head baby';
        img.classList.add('ned-image');
        body.appendChild(img);
    }
}

export default Image;