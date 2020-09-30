
describe('test suite', function(){
    beforeEach(function(){
       this.element = $('<input id="name" type="text" />');
       this.element.appendTo('body');
    });

    // clean up
    afterEach(function(){
       this.element.remove(); 
    });
    
    it('should change the value', function(){
       expect(this.element.val()).toEqual('');
      
       //when
       setValue('Alex Baur');

      // then
      expect(this.element.val()).toEqual('Alex Baur');
    });
 });