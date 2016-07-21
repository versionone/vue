import {create, easeOut, easeOutFunction} from './Transitions';

describe('styles/Transitions/create', function() {
    beforeEach(() => {
        this.actual = undefined;
    });
    describe('given no duration, property to animate, delay, or ease function', () => {
        describe('when creating a transition', () => {
            beforeEach(() => {
                this.actual = create();
            });
            it('it should create a transition style with default values', () => {
                this.actual.should.equal('all 450ms linear 0ms');
            });
        });
    });
    describe('given a duration, property to animate, delay, and ease function', () => {
        beforeEach(() => {
            this.duration = '500ms';
            this.property = 'background';
            this.delay = '1s';
            this.easeFunction = 'easeOut';
        });
        describe('when creating a transition', () => {
            beforeEach(() => {
                this.actual = create(this.duration, this.property, this.delay, this.easeFunction);
            });
            it('it should return a CSS transition style for the provided inputs', () => {
                this.actual.should.equal(`${this.property} ${this.duration} ${this.easeFunction} ${this.delay}`);
            });
        });
    });
});

describe('styles/Transitions/easeOut', function() {
    beforeEach(() => {
        this.actual = undefined;
    });
    describe('given no inputs', () => {
        describe('when creating an easeOut transition', () => {
            beforeEach(() => {
                this.actual = easeOut();
            });
            it('it should return a single transition style for easeOut on all properties with default transition values', () => {
                this.actual.should.equal(`all 450ms ${easeOutFunction} 0ms`);
            });
        });
    });
    describe('given a single property', () => {
        beforeEach(() => {
            this.property = 'background';
        });
        describe('when creating an easeOut transition', () => {
            beforeEach(() => {
                this.actual = easeOut('500ms', this.property)
            });
            it('it should return a single transition style on the provided property', () => {
                this.actual.should.equal(`${this.property} 500ms ${easeOutFunction} 0ms`);
            });
        });
    });
    describe('given multiple properties', () => {
        beforeEach(() => {
            this.property = ['background', 'color'];
        });
        describe('when creating an easeOut transition', () => {
            beforeEach(() => {
                this.actual = easeOut('500ms', this.property);
            });
            it('it should return a transition style containing a style for each provided property', () => {
                this.actual.should.equal(`background 500ms ${easeOutFunction} 0ms,color 500ms ${easeOutFunction} 0ms`);
            });
        });
    });
    describe('given a duration, a property, a delay, and an easeFunction', () => {
        beforeEach(() => {
            this.duration = '550ms';
            this.property = 'background';
            this.delay = '1ms';
            this.easeFunction = 'linear';
        });
        describe('when creating an easeOut transition', () => {
            beforeEach(() => {
                this.actual = easeOut(this.duration, this.property, this.easeFunction, this.delay);
            });
            it('it should return a transition style containing a style for each provided property', () => {
                this.actual.should.equal(`${this.property} ${this.duration} ${this.delay} ${this.easeFunction}`);
            });
        });
    });
});