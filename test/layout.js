describe('Layout', function(){

  var Layout   = require('tsld/scripts/layout')
    , assert   = require('assert');

  var layout = null;

  beforeEach(function() {
    $("#mocha").empty().append('<div id="fixture"></div>');

    layout = new Layout("#fixture");
    layout.initialize();
  });

  describe('#initialize()', function(){
    it('should add and set the container', function(){
      assert.strictEqual(layout.container[0], $("#fixture")[0]);
    });

    it('should add and set the SVG', function(){
      assert.strictEqual(layout.svg[0][0], $("#fixture svg.tsld")[0]);
    });

    it('should add and set the SVG graphics context', function(){
      assert.strictEqual(layout.g[0][0], $("#fixture svg.tsld g.tsld")[0]);
    });

    it('should add and set the title container', function(){
      assert.strictEqual(layout.titleContainer[0][0], $("#fixture div.tsld.title-container")[0]);
    });

    it('should add and set the subtitle container', function(){
      assert.strictEqual(layout.subtitleContainer[0][0], $("#fixture div.tsld.subtitle-container")[0]);
    });
  });
});
