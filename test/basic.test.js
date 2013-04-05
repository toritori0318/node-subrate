var assert = require('assert')
  , subrate = require('../lib/subrate')

describe('basic', function() {
    it('rate basic test', function (done){
        var rate = new subrate({max_rate : 100});

        var r1 = 0
           ,r2 = 0
           ,r3 = 0;

        rate.add(10, function () { r1++; });
        rate.add(20, function () { r2++; });
        rate.add('default', function () { r3++; });

        var func = rate.generate();

        for (var i=0;i<100000;i++) {
            func();
        }
        var per1 = (r1)/(r1+r2+r3) * 100;
        var per2 = (r2)/(r1+r2+r3) * 100;
        var per3 = (r3)/(r1+r2+r3) * 100;
        assert.ok(per1 <= 11.5 && per1 >= 8.5,  'r1 ok')
        assert.ok(per2 <= 21.5 && per2 >= 18.5, 'r2 ok')
        assert.ok(per3 <= 71.5 && per3 >= 68.5, 'r3 ok')

        // clear
        rate.clear();
        assert.ok(rate.func.length == 0, 'clear func ok')
        assert.ok(!rate.default_func,    'clear default_func ok')

        done();
    });
    it('rate string test', function (done){
        var rate = new subrate({max_rate : 100});

        rate.add(10, 'hoge');
        rate.add(20, 'fuga');
        rate.add('default', 'piyo');

        var func = rate.generate();

        var summary = {}
        for (var i=0;i<100000;i++) {
            var str = func();
            if(!summary[str]) summary[str] = 0
            summary[str] += 1
        }

        assert.ok(summary['hoge'] <= 12000 && summary['hoge'] >= 8000,  'hoge ok')
        assert.ok(summary['fuga'] <= 22000 && summary['fuga'] >= 18000,  'hoge ok')
        assert.ok(summary['piyo'] <= 72000 && summary['piyo'] >= 68000,  'hoge ok')

        done();
    });
});
