// Generated by purs version 0.13.8
"use strict";
var Control_Category = require("../Control.Category/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");
var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative/index.js");
var Data_Semigroup_Foldable = require("../Data.Semigroup.Foldable/index.js");
var Data_Traversable = require("../Data.Traversable/index.js");
var Traversable1 = function (Foldable10, Traversable1, sequence1, traverse1) {
    this.Foldable10 = Foldable10;
    this.Traversable1 = Traversable1;
    this.sequence1 = sequence1;
    this.traverse1 = traverse1;
};
var traverse1 = function (dict) {
    return dict.traverse1;
};
var sequence1Default = function (dictTraversable1) {
    return function (dictApply) {
        return traverse1(dictTraversable1)(dictApply)(Control_Category.identity(Control_Category.categoryFn));
    };
};
var traversableDual = new Traversable1(function () {
    return Data_Semigroup_Foldable.foldableDual;
}, function () {
    return Data_Traversable.traversableDual;
}, function (dictApply) {
    return sequence1Default(traversableDual)(dictApply);
}, function (dictApply) {
    return function (f) {
        return function (v) {
            return Data_Functor.map(dictApply.Functor0())(Data_Monoid_Dual.Dual)(f(v));
        };
    };
});
var traversableMultiplicative = new Traversable1(function () {
    return Data_Semigroup_Foldable.foldableMultiplicative;
}, function () {
    return Data_Traversable.traversableMultiplicative;
}, function (dictApply) {
    return sequence1Default(traversableMultiplicative)(dictApply);
}, function (dictApply) {
    return function (f) {
        return function (v) {
            return Data_Functor.map(dictApply.Functor0())(Data_Monoid_Multiplicative.Multiplicative)(f(v));
        };
    };
});
var sequence1 = function (dict) {
    return dict.sequence1;
};
var traverse1Default = function (dictTraversable1) {
    return function (dictApply) {
        return function (f) {
            return function (ta) {
                return sequence1(dictTraversable1)(dictApply)(Data_Functor.map((dictTraversable1.Traversable1()).Functor0())(f)(ta));
            };
        };
    };
};
module.exports = {
    sequence1: sequence1,
    traverse1: traverse1,
    Traversable1: Traversable1,
    traverse1Default: traverse1Default,
    sequence1Default: sequence1Default,
    traversableDual: traversableDual,
    traversableMultiplicative: traversableMultiplicative
};
