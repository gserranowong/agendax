// Generated by purs version 0.13.8
"use strict";
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Bind = require("../Control.Bind/index.js");
var Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
var Control_Monad_State_Trans = require("../Control.Monad.State.Trans/index.js");
var Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");
var Control_Monad_Writer_Trans = require("../Control.Monad.Writer.Trans/index.js");
var Data_EuclideanRing = require("../Data.EuclideanRing/index.js");
var Data_Identity = require("../Data.Identity/index.js");
var Data_Monoid = require("../Data.Monoid/index.js");
var Data_Unit = require("../Data.Unit/index.js");
var Test_Spec_Console = require("../Test.Spec.Console/index.js");
var Test_Spec_Reporter_Base = require("../Test.Spec.Reporter.Base/index.js");
var Test_Spec_Result = require("../Test.Spec.Result/index.js");
var Test_Spec_Runner_Event = require("../Test.Spec.Runner.Event/index.js");
var Test_Spec_Speed = require("../Test.Spec.Speed/index.js");
var Test_Spec_Style = require("../Test.Spec.Style/index.js");
var dotReporter = function (v) {
    var wrap = function (action) {
        return Control_Bind.bind(Control_Monad_State_Trans.bindStateT(Control_Monad_Writer_Trans.monadWriterT(Data_Monoid.monoidString)(Data_Identity.monadIdentity)))(Control_Monad_State_Class.modify(Control_Monad_State_Trans.monadStateStateT(Control_Monad_Writer_Trans.monadWriterT(Data_Monoid.monoidString)(Data_Identity.monadIdentity)))(function (v1) {
            return v1 + 1 | 0;
        }))(function (n) {
            return Control_Bind.discard(Control_Bind.discardUnit)(Control_Monad_State_Trans.bindStateT(Control_Monad_Writer_Trans.monadWriterT(Data_Monoid.monoidString)(Data_Identity.monadIdentity)))(Control_Applicative.when(Control_Monad_State_Trans.applicativeStateT(Control_Monad_Writer_Trans.monadWriterT(Data_Monoid.monoidString)(Data_Identity.monadIdentity)))(Data_EuclideanRing.mod(Data_EuclideanRing.euclideanRingInt)(n)(v.width) === 0)(Test_Spec_Console.tellLn(Control_Monad_State_Trans.monadWriterStateT(Control_Monad_Writer_Trans.monadWriterWriterT(Data_Monoid.monoidString)(Data_Identity.monadIdentity)))("")))(function () {
                return Control_Monad_Writer_Class.tell(Control_Monad_State_Trans.monadTellStateT(Control_Monad_Writer_Trans.monadTellWriterT(Data_Monoid.monoidString)(Data_Identity.monadIdentity)))(action);
            });
        });
    };
    return Test_Spec_Reporter_Base.defaultReporter(-1 | 0)(function (v1) {
        if (v1 instanceof Test_Spec_Runner_Event.TestEnd && v1.value2 instanceof Test_Spec_Result.Success) {
            return wrap(Test_Spec_Style.styled(Test_Spec_Speed.toStyle(v1.value2.value0))("."));
        };
        if (v1 instanceof Test_Spec_Runner_Event.TestEnd && v1.value2 instanceof Test_Spec_Result.Failure) {
            return wrap(Test_Spec_Style.styled(Test_Spec_Style.red)("!"));
        };
        if (v1 instanceof Test_Spec_Runner_Event.Pending) {
            return wrap(Test_Spec_Style.styled(Test_Spec_Style.dim)(","));
        };
        if (v1 instanceof Test_Spec_Runner_Event.End) {
            return Test_Spec_Console.tellLn(Control_Monad_State_Trans.monadWriterStateT(Control_Monad_Writer_Trans.monadWriterWriterT(Data_Monoid.monoidString)(Data_Identity.monadIdentity)))("");
        };
        return Control_Applicative.pure(Control_Monad_State_Trans.applicativeStateT(Control_Monad_Writer_Trans.monadWriterT(Data_Monoid.monoidString)(Data_Identity.monadIdentity)))(Data_Unit.unit);
    });
};
module.exports = {
    dotReporter: dotReporter
};
