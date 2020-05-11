function with100500HZ(target, propertyName, descriptor) {
    console.log('with100500HZ', {target, propertyName, descriptor});
    let _value: any = 2;
    return {
        ...descriptor,
        get() {
            console.log('get', _value)
            return _value;
        },
        set(val) {
            console.log('set', val)
            _value = (typeof val === 'number') ? 100500 : 'hz';
        }
    };

    // let audi = new Audi();
    // audi.drive();
    // console.log(audi.a)
    // audi.a = 10;
    // console.log(audi.a)
    // audi.a = '10';
    // console.log(audi.a)
}


function Component(config: { selector: 'button', template: string }) {
    return function <T extends { new(...args: any[]): object }>(Constructor: T) {
        return class extends Constructor {
            constructor(...props) {
                super(...props);
                const elem = document.querySelector(config.selector);
                if (!elem) {
                    throw new Error('Nothing`s found');
                }

                elem.innerHTML = config.template.replace('#{name}', props[0]);
            }
        }
    }
}

function bind(target, _2, descriptor: PropertyDescriptor): PropertyDescriptor {
    const {value, writable, ...restDescriptor} = descriptor;
    return {
        ...restDescriptor,
        get() {
            return value.bind(this);
        }
    };
}

@Component({
    selector: 'button',
    template: `
        <div>
            <p>#{name}</p>
        </div>
    `
})
class Car {
    constructor(private model: string = 'Audi') {
    }

    @with100500HZ set a(_) {
        this.a = _;
    }

    @bind
    drive() {
        console.log('smth: ' + this.model);
    }
}

class Audi extends Car {}
class AudiC extends Audi {}


let audi = new AudiC();
audi.drive();
document.addEventListener('click', audi.drive);
