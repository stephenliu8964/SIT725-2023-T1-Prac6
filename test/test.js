let expect = require('chai').expect;
let request = require('request');
let url = 'http://localhost:3000/api/cats';
let cat = {
    title: 'kitten123',
    link: 'kitten',
    path: 'kitten',
    description: 'kitten'
}

describe('get all cats', function() {
    it('returns status code of 200', function(done){
        request(url, function(error,response,body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('returns message of success', function(done){
        request(url, function(error,response,body){
            body = JSON.parse(body)
            expect(body.message).to.contain('Success');
            done();
        });
    });

    it('returns an array', function(done){
        request(url, function(error,response,body){
            body = JSON.parse(body)
            expect(body.data).to.be.a('array');
            done();
        });
    });
});

describe('post a cat', function(){
    it('insert a cat to database', function(done){
        request.post({url:url, form: cat}, function(error,response,body){
            body = JSON.parse(body);
            expect(body.message).to.contain('added');
            done();
        });
    });
});

describe('delete a cat', function(){
    it('delete a cat from database', function(done){
        request.delete({url:url, form: cat}, function(error,response,body){
            body = JSON.parse(body);
            expect(body.message).to.contain('removed');
            done();
        });
    });
});