// Generated from ./Select.g4 by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('../../index');

// This class defines a complete generic visitor for a parse tree produced by SelectParser.

function SelectVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

SelectVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
SelectVisitor.prototype.constructor = SelectVisitor;

// Visit a parse tree produced by SelectParser#select.
SelectVisitor.prototype.visitSelect = function(ctx) {
};


// Visit a parse tree produced by SelectParser#subselect.
SelectVisitor.prototype.visitSubselect = function(ctx) {
};


// Visit a parse tree produced by SelectParser#from.
SelectVisitor.prototype.visitFrom = function(ctx) {
};


// Visit a parse tree produced by SelectParser#and.
SelectVisitor.prototype.visitAnd = function(ctx) {
};


// Visit a parse tree produced by SelectParser#or.
SelectVisitor.prototype.visitOr = function(ctx) {
};


// Visit a parse tree produced by SelectParser#arrayconstant.
SelectVisitor.prototype.visitArrayconstant = function(ctx) {
};


// Visit a parse tree produced by SelectParser#fields.
SelectVisitor.prototype.visitFields = function(ctx) {
};


// Visit a parse tree produced by SelectParser#where.
SelectVisitor.prototype.visitWhere = function(ctx) {
};


// Visit a parse tree produced by SelectParser#conditionset.
SelectVisitor.prototype.visitConditionset = function(ctx) {
};


// Visit a parse tree produced by SelectParser#condition.
SelectVisitor.prototype.visitCondition = function(ctx) {
};



exports.SelectVisitor = SelectVisitor;