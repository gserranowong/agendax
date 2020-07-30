// Generated by purs version 0.13.8
"use strict";
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Apply = require("../Control.Apply/index.js");
var Control_Bind = require("../Control.Bind/index.js");
var Control_Monad = require("../Control.Monad/index.js");
var Data_Eq = require("../Data.Eq/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_Ord = require("../Data.Ord/index.js");
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Data_Show = require("../Data.Show/index.js");
var First = function (x) {
    return x;
};
var showFirst = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(First " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semigroupFirst = new Data_Semigroup.Semigroup(function (x) {
    return function (v) {
        return x;
    };
});
var ordFirst = function (dictOrd) {
    return dictOrd;
};
var functorFirst = new Data_Functor.Functor(function (f) {
    return function (m) {
        return f(m);
    };
});
var eqFirst = function (dictEq) {
    return dictEq;
};
var eq1First = new Data_Eq.Eq1(function (dictEq) {
    return Data_Eq.eq(eqFirst(dictEq));
});
var ord1First = new Data_Ord.Ord1(function () {
    return eq1First;
}, function (dictOrd) {
    return Data_Ord.compare(ordFirst(dictOrd));
});
var boundedFirst = function (dictBounded) {
    return dictBounded;
};
var applyFirst = new Control_Apply.Apply(function () {
    return functorFirst;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindFirst = new Control_Bind.Bind(function () {
    return applyFirst;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeFirst = new Control_Applicative.Applicative(function () {
    return applyFirst;
}, First);
var monadFirst = new Control_Monad.Monad(function () {
    return applicativeFirst;
}, function () {
    return bindFirst;
});
module.exports = {
    First: First,
    eqFirst: eqFirst,
    eq1First: eq1First,
    ordFirst: ordFirst,
    ord1First: ord1First,
    boundedFirst: boundedFirst,
    showFirst: showFirst,
    functorFirst: functorFirst,
    applyFirst: applyFirst,
    applicativeFirst: applicativeFirst,
    bindFirst: bindFirst,
    monadFirst: monadFirst,
    semigroupFirst: semigroupFirst
};
