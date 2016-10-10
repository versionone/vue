import mergeStyles from './mergeStyles';

describe('mergeStyles', function() {
    beforeEach(() => {
        this.actual = undefined;
    });
    describe('given styles for a single node', () => {
        beforeEach(() => {
            this.style1 = {a: 'b'};
            this.style2 = {b: 'c'};
        });
        describe('when merging the styles', () => {
            beforeEach(() => {
                this.actual = mergeStyles(this.style1, this.style2);
            });
            it('it should merge the styles from left to right', () => {
                this.actual.should.eql({
                    a: 'b',
                    b: 'c'
                });
            });
        });
    });
    describe('given styles for multiple nodes', () => {
        describe('when merging the styles', () => {
            beforeEach(() => {
                const style1 = {
                    a: 'b',
                    focused: {
                        q: 'r'
                    }
                };
                const style2 = {
                    b: 'c',
                    focused: {d: 'e'}
                };
                const style3 = {
                    p: 'u'
                };
                this.actual = mergeStyles(style1, style2, style3);
            });
            it('it should merge the styles from left to right', () => {
                this.actual.should.eql({
                    a: 'b',
                    b: 'c',
                    focused: {
                        q: 'r',
                        d: 'e'
                    },
                    p: 'u'
                });
            });
        });
    });
});