# node-subrate

node-subrate is implementation of [Sub::Rate](https://github.com/typester/Sub-Rate) in Node.js.

# Example

    var rate = new subrate({max_rate : 100});

    var r1 = 0
       ,r2 = 0
       ,r3 = 0;

    // function
    rate.add(10, function () { r1++; });
    rate.add(20, function () { r2++; });
    // string
    rate.add(20, 'hoge');
    rate.add(30, 'fuga');
    // default
    rate.add('default', 'piyo');

    // Calling this $func then:
    // sub1 will be called by rate about 10/100 (10%),
    // sub2 will be called by rate about 20/100 (20%),
    // sub3 will be called by rate about 20/100 (20%),
    // sub4 will be called by rate about 30/100 (30%),
    // default sub will be called in rest case (20%),
    func->();

# Testing

    # install mocha
    npm install mocha -g

    # exec test
    mocha

# License

    MIT
