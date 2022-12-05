import { DOM, Tick, Animate, OMath, Timeout } from '../js/index.mjs';

export class First {
    constructor() {
        const _this = this;

        const svg = DOM.query('#first .animation svg')[0];

        const svgns = 'http://www.w3.org/2000/svg';

        const ellipses = [];

       

        function update(dt, time) {
            ellipses.forEach((ellipse, i) => {
                let final = ellipse.final.rx;

                final = OMath.mix(
                    ellipse.initial.rx,
                    final,
                    OMath.smoothstep(-0.9, 0.9, Math.sin(time * 0.001))
                );

                let rx = OMath.mix(ellipse.initial.rx, final, ellipse.anim.mult);

                ellipse.setAttributeNS(null, 'rx', rx);
            });
        }

        function animate(ellipse, i, isMobile, isFirst) {
            if (!_this.isActive) return;
            new Animate(ellipse.anim, 1500, {
                rx: ellipse.anim.dir ? ellipse.final.rx : ellipse.initial.rx,
                delay: (isMobile ? 0 : 100) + (isFirst ? i * 50 : 2000),
                ease: 'inOutQuint',
                update: () => {
                    ellipse.setAttributeNS(null, 'rx', ellipse.anim.rx);
                },
                complete: () => {
                    animate(ellipse, i, isMobile, false);
                },
            });
            ellipse.anim.dir = !ellipse.anim.dir;
        }

        this.animateIn = async (isMobile) => {
            _this.isActive = true;
            ellipses.forEach((ellipse, i) => {
                ellipse.anim.dir = true;
                ellipse.anim.rx = ellipse.initial.rx;
                animate(ellipse, i, isMobile, true);
            });
        };

        this.animateOut = () => {
            _this.isActive = false;
        };
    }
}
