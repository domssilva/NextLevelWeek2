import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export default function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4" alt="Diego Fernandes"/>
                <div>
                    <strong>Diego Fernandes</strong>
                    <span>Chemistry</span>
                </div>
            </header>

            <p>
                Lorem ipsum, dolor sit amet consectetur. 
                <br/>
                <br/>
                Commodi, at dolore. Mollitia ad amet fugit architecto assumenda unde expedita, et, perferendis minus ratione ex!
            </p>

            <footer>
                <p>
                    Price/hour
                    <strong>$ 80,00</strong>
                </p>
                <button>
                    <img src={whatsappIcon} alt="whatsapp"/>
                    Get in touch
                </button>
            </footer>
        </article>
    )
}
