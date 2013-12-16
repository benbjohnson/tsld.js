describe('BBox', function(){

    var BBox   = require('tsld/scripts/bbox'),
        assert = require('assert');

    describe('#initialize()', function(){
        it('should set the properties from the arguments', function(){
            var bbox = new BBox(1, 2, 3, 4);
            assert.equal(1, bbox.top);
            assert.equal(2, bbox.right);
            assert.equal(3, bbox.bottom);
            assert.equal(4, bbox.left);
        });
    });

    describe('#equal()', function(){
        it('should return true if all properties are equal', function(){
            var a = new BBox(1, 2, 3, 4),
                b = new BBox(1, 2, 3, 4);
            assert(a.equal(b));
        });

        it('should return true if all both properties are undefined', function(){
            var a = new BBox(),
                b = new BBox();
            assert(a.equal(b));
        });

        it('should return true if all both properties are null', function(){
            var a = new BBox(null, null, null, null),
                b = new BBox(null, null, null, null);
            assert(a.equal(b));
        });

        it('should return false if any properties are not equal', function(){
            var a = new BBox(1, 2, 3, 4),
                b = new BBox(1, 2, 3, 5);
            assert(!a.equal(b));
        });

        it('should return false if RHS is undefined', function(){
            var a = new BBox(1, 2, 3, 4);
            assert(!a.equal(undefined));
        });

        it('should return false if RHS is null', function(){
            var a = new BBox(1, 2, 3, 4);
            assert(!a.equal(null));
        });
    });

    describe('#union()', function(){
        it('should create the smallest bbox that contains both bboxes', function(){
            var a = new BBox(1, 2, 3, 4),
                b = new BBox(4, 3, 2, 1),
                bbox = a.union(b);

            assert.equal(1, bbox.top);
            assert.equal(3, bbox.right);
            assert.equal(3, bbox.bottom);
            assert.equal(1, bbox.left);
        });

        it('should pick non-undefined side (LHS)', function(){
            var a = new BBox(),
                b = new BBox(1, 2, 3, 4),
                bbox = a.union(b);

            assert.equal(1, bbox.top);
            assert.equal(2, bbox.right);
            assert.equal(3, bbox.bottom);
            assert.equal(4, bbox.left);
        });

        it('should pick non-undefined side (RHS)', function(){
            var a = new BBox(1, 2, 3, 4),
                b = new BBox(),
                bbox = a.union(b);

            assert.equal(1, bbox.top);
            assert.equal(2, bbox.right);
            assert.equal(3, bbox.bottom);
            assert.equal(4, bbox.left);
        });
    });
});
