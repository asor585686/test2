import { DOM, Animate, OMath, Tick } from '../js/index.mjs';

export class Fourth {
    constructor() {
        const _this = this;

        const svg = DOM.query('#fourth .animation svg')[0];

        const svgns = 'http://www.w3.org/2000/svg';
        const circles = [];
        let time = 0;

        

        function update(dt, time) {
            circles.forEach((circle, i) => {
                const initial = circle.initial.cy;
                let final = circle.final.cy;
                const cy = OMath.mix(initial, final, circle.anim.mult);
                circle.setAttributeNS(null, 'cy', cy);

                let r = OMath.mix(30, 48, 0.5 + 0.5 * Math.sin(time * 0.0008 + (6.28 / 9) * i * 0.5));
                r = OMath.mix(48, r, circle.anim.mult);
                circle.setAttributeNS(null, 'r', r);
            });
        }

        this.animateIn = (isMobile) => {
            circles.forEach((circle, i) => {
                circle.anim.mult = 0;

                new Animate(circle.anim, 1500, {
                    mult: 1,
                    delay: (isMobile ? 0 : 100) + i * 50,
                    ease: 'inOutCubic',
                });
            });

            Tick.add(update);
        };

        this.animateOut = () => {
            Tick.remove(update);
        };
    }
}
