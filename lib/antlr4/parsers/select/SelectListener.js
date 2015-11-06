// Generated from ./Select.g4 by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('../../index');

// This class defines a complete listener for a parse tree produced by SelectParser.
function SelectListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

SelectListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
SelectListener.prototype.constructor = SelectListener;

// Enter a parse tree produced by SelectParser#select.
SelectListener.prototype.enterSelect = function(ctx) {
};

// Exit a parse tree produced by SelectParser#select.
SelectListener.prototype.exitSelect = function(ctx) {
};


// Enter a parse tree produced by SelectParser#subselect.
SelectListener.prototype.enterSubselect = function(ctx) {
};

// Exit a parse tree produced by SelectParser#subselect.
SelectListener.prototype.exitSubselect = function(ctx) {
};


// Enter a parse tree produced by SelectParser#from.
SelectListener.prototype.enterFrom = function(ctx) {
};

// Exit a parse tree produced by SelectParser#from.
SelectListener.prototype.exitFrom = function(ctx) {
};


// Enter a parse tree produced by SelectParser#and.
SelectListener.prototype.enterAnd = function(ctx) {
};

// Exit a parse tree produced by SelectParser#and.
SelectListener.prototype.exitAnd = function(ctx) {
};


// Enter a parse tree produced by SelectParser#or.
SelectListener.prototype.enterOr = function(ctx) {
};

// Exit a parse tree produced by SelectParser#or.
SelectListener.prototype.exitOr = function(ctx) {
};


// Enter a parse tree produced by SelectParser#arrayconstant.
SelectListener.prototype.enterArrayconstant = function(ctx) {
};

// Exit a parse tree produced by SelectParser#arrayconstant.
SelectListener.prototype.exitArrayconstant = function(ctx) {
};


// Enter a parse tree produced by SelectParser#fields.
SelectListener.prototype.enterFields = function(ctx) {
};

// Exit a parse tree produced by SelectParser#fields.
SelectListener.prototype.exitFields = function(ctx) {
};


// Enter a parse tree produced by SelectParser#where.
SelectListener.prototype.enterWhere = function(ctx) {
};

// Exit a parse tree produced by SelectParser#where.
SelectListener.prototype.exitWhere = function(ctx) {
};


// Enter a parse tree produced by SelectParser#conditionset.
SelectListener.prototype.enterConditionset = function(ctx) {
};

// Exit a parse tree produced by SelectParser#conditionset.
SelectListener.prototype.exitConditionset = function(ctx) {
};


// Enter a parse tree produced by SelectParser#condition.
SelectListener.prototype.enterCondition = function(ctx) {
};

// Exit a parse tree produced by SelectParser#condition.
SelectListener.prototype.exitCondition = function(ctx) {
};



exports.SelectListener = SelectListener;