function SubRate(opt) {
    this.max_rate       = (opt.max_rate) ? parseInt(opt.max_rate) : 100;
    this.func           = [];
    this.rand_func      = function (rand) { return Math.floor( Math.random() * rand ); };
    this.default_func   = null;
    this.sort           = 0;
}

SubRate.prototype.add = function (rate, func) {
    if(rate == 'default') {
        this.default_func = func;
    } else {
        var num_rate = parseInt(rate);
        var total_rate = 0;
        for(var i=0;i<func.length;i++) {
            total_rate += func[i].num_rate;
        }
        if (total_rate + num_rate > this.max_rate) {
            throw new Error('Exceed max_rate, current:%s max:%s', total_rate + num_rate, this.max_rate)
        }

        this.func.push([num_rate, func]);
    }
};

SubRate.prototype.generate = function (rate, func) {
    var sorted_funcs = this.func;
    if(this.sort) {
        sorted_funcs.sort(function (a,b) {
            return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
    }

    var rand         = this.rand_func;
    var max_rate     = this.max_rate;
    var default_func = this.default_func || function() {};

    return function (args) {
        var index  = rand( max_rate );
        var cursor = 0;

        for (var i=0;i<sorted_funcs.length;i++) {
            cursor += sorted_funcs[i][0];

            if (index <= cursor) {
                if(typeof sorted_funcs[i][1] === 'function') {
                    return sorted_funcs[i][1](args);
                } else {
                    return sorted_funcs[i][1];
                }
            }
        }

        if (default_func) {
            if(typeof default_func === 'function') {
                return default_func(args);
            } else {
                return default_func;
            }
        }
        else {
            return;
        }
    };
}

SubRate.prototype.clear = function () {
    this.func           = [];
    this.default_func   = null;
    this.sort           = 0;
};

module.exports = SubRate;
