// Generated from ./Select.g4 by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('../../index');
var SelectListener = require('./SelectListener').SelectListener;
var SelectVisitor = require('./SelectVisitor').SelectVisitor;

var grammarFileName = "Select.g4";

var serializedATN = ["\3\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\3\17{\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t",
    "\t\4\n\t\n\4\13\t\13\3\2\3\2\3\2\3\2\7\2\33\n\2\f\2\16\2\36\13\2\3\2",
    "\3\2\5\2\"\n\2\3\3\3\3\3\3\3\3\3\3\7\3)\n\3\f\3\16\3,\13\3\3\3\3\3\5",
    "\3\60\n\3\3\3\3\3\3\4\3\4\3\4\3\5\3\5\3\6\3\6\3\7\3\7\3\7\3\7\7\7?\n",
    "\7\f\7\16\7B\13\7\3\7\3\7\3\b\3\b\5\bH\n\b\3\t\3\t\3\t\3\n\3\n\3\n\3",
    "\n\3\n\5\nR\n\n\3\n\3\n\5\nV\n\n\3\n\3\n\3\n\3\n\3\n\5\n]\n\n\6\n_\n",
    "\n\r\n\16\n`\3\n\3\n\3\n\3\n\3\n\5\nh\n\n\3\13\3\13\3\13\3\13\3\13\3",
    "\13\3\13\3\13\3\13\3\13\3\13\3\13\3\13\3\13\3\13\5\13y\n\13\3\13\2\2",
    "\f\2\4\6\b\n\f\16\20\22\24\2\2\u0080\2\26\3\2\2\2\4#\3\2\2\2\6\63\3",
    "\2\2\2\b\66\3\2\2\2\n8\3\2\2\2\f:\3\2\2\2\16G\3\2\2\2\20I\3\2\2\2\22",
    "g\3\2\2\2\24x\3\2\2\2\26\27\7\3\2\2\27\34\5\16\b\2\30\31\7\4\2\2\31",
    "\33\5\16\b\2\32\30\3\2\2\2\33\36\3\2\2\2\34\32\3\2\2\2\34\35\3\2\2\2",
    "\35\37\3\2\2\2\36\34\3\2\2\2\37!\5\6\4\2 \"\5\20\t\2! \3\2\2\2!\"\3",
    "\2\2\2\"\3\3\2\2\2#$\7\5\2\2$%\7\3\2\2%*\5\16\b\2&\'\7\4\2\2\')\5\16",
    "\b\2(&\3\2\2\2),\3\2\2\2*(\3\2\2\2*+\3\2\2\2+-\3\2\2\2,*\3\2\2\2-/\5",
    "\6\4\2.\60\5\20\t\2/.\3\2\2\2/\60\3\2\2\2\60\61\3\2\2\2\61\62\7\6\2",
    "\2\62\5\3\2\2\2\63\64\7\7\2\2\64\65\7\16\2\2\65\7\3\2\2\2\66\67\7\b",
    "\2\2\67\t\3\2\2\289\7\t\2\29\13\3\2\2\2:;\7\5\2\2;@\7\r\2\2<=\7\4\2",
    "\2=?\7\r\2\2><\3\2\2\2?B\3\2\2\2@>\3\2\2\2@A\3\2\2\2AC\3\2\2\2B@\3\2",
    "\2\2CD\7\6\2\2D\r\3\2\2\2EH\5\4\3\2FH\7\16\2\2GE\3\2\2\2GF\3\2\2\2H",
    "\17\3\2\2\2IJ\7\n\2\2JK\5\22\n\2K\21\3\2\2\2LR\5\24\13\2MN\7\5\2\2N",
    "O\5\22\n\2OP\7\6\2\2PR\3\2\2\2QL\3\2\2\2QM\3\2\2\2R^\3\2\2\2SV\5\b\5",
    "\2TV\5\n\6\2US\3\2\2\2UT\3\2\2\2V\\\3\2\2\2W]\5\24\13\2XY\7\5\2\2YZ",
    "\5\22\n\2Z[\7\6\2\2[]\3\2\2\2\\W\3\2\2\2\\X\3\2\2\2]_\3\2\2\2^U\3\2",
    "\2\2_`\3\2\2\2`^\3\2\2\2`a\3\2\2\2ah\3\2\2\2bc\7\5\2\2cd\5\22\n\2de",
    "\7\6\2\2eh\3\2\2\2fh\5\24\13\2gQ\3\2\2\2gb\3\2\2\2gf\3\2\2\2h\23\3\2",
    "\2\2ij\7\16\2\2jk\7\13\2\2ky\7\16\2\2lm\7\16\2\2mn\7\13\2\2ny\7\r\2",
    "\2op\7\r\2\2pq\7\13\2\2qy\7\16\2\2rs\7\r\2\2st\7\13\2\2ty\7\r\2\2uv",
    "\7\16\2\2vw\7\f\2\2wy\5\f\7\2xi\3\2\2\2xl\3\2\2\2xo\3\2\2\2xr\3\2\2",
    "\2xu\3\2\2\2y\25\3\2\2\2\16\34!*/@GQU\\`gx"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ 'null', "'select'", "','", "'('", "')'", "'from'", 
                     "'and'", "'or'", "'where'", 'null', "'in'" ];

var symbolicNames = [ 'null', 'null', 'null', 'null', 'null', 'null', 'null', 
                      'null', 'null', "OPERATOR", "ARRAYOPERATOR", "CONSTANT", 
                      "FIELD", "WS" ];

var ruleNames =  [ "select", "subselect", "from", "and", "or", "arrayconstant", 
                   "fields", "where", "conditionset", "condition" ];

function SelectParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

SelectParser.prototype = Object.create(antlr4.Parser.prototype);
SelectParser.prototype.constructor = SelectParser;

Object.defineProperty(SelectParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

SelectParser.EOF = antlr4.Token.EOF;
SelectParser.T__0 = 1;
SelectParser.T__1 = 2;
SelectParser.T__2 = 3;
SelectParser.T__3 = 4;
SelectParser.T__4 = 5;
SelectParser.T__5 = 6;
SelectParser.T__6 = 7;
SelectParser.T__7 = 8;
SelectParser.OPERATOR = 9;
SelectParser.ARRAYOPERATOR = 10;
SelectParser.CONSTANT = 11;
SelectParser.FIELD = 12;
SelectParser.WS = 13;

SelectParser.RULE_select = 0;
SelectParser.RULE_subselect = 1;
SelectParser.RULE_from = 2;
SelectParser.RULE_and = 3;
SelectParser.RULE_or = 4;
SelectParser.RULE_arrayconstant = 5;
SelectParser.RULE_fields = 6;
SelectParser.RULE_where = 7;
SelectParser.RULE_conditionset = 8;
SelectParser.RULE_condition = 9;

function SelectContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SelectParser.RULE_select;
    return this;
}

SelectContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SelectContext.prototype.constructor = SelectContext;

SelectContext.prototype.fields = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FieldsContext);
    } else {
        return this.getTypedRuleContext(FieldsContext,i);
    }
};

SelectContext.prototype.from = function() {
    return this.getTypedRuleContext(FromContext,0);
};

SelectContext.prototype.where = function() {
    return this.getTypedRuleContext(WhereContext,0);
};

SelectContext.prototype.enterRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.enterSelect(this);
	}
};

SelectContext.prototype.exitRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.exitSelect(this);
	}
};

SelectContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SelectVisitor ) {
        return visitor.visitSelect(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SelectParser.SelectContext = SelectContext;

SelectParser.prototype.select = function() {

    var localctx = new SelectContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, SelectParser.RULE_select);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 20;
        this.match(SelectParser.T__0);
        this.state = 21;
        this.fields();
        this.state = 26;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SelectParser.T__1) {
            this.state = 22;
            this.match(SelectParser.T__1);
            this.state = 23;
            this.fields();
            this.state = 28;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 29;
        this.from();
        this.state = 31;
        _la = this._input.LA(1);
        if(_la===SelectParser.T__7) {
            this.state = 30;
            this.where();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function SubselectContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SelectParser.RULE_subselect;
    return this;
}

SubselectContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SubselectContext.prototype.constructor = SubselectContext;

SubselectContext.prototype.fields = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FieldsContext);
    } else {
        return this.getTypedRuleContext(FieldsContext,i);
    }
};

SubselectContext.prototype.from = function() {
    return this.getTypedRuleContext(FromContext,0);
};

SubselectContext.prototype.where = function() {
    return this.getTypedRuleContext(WhereContext,0);
};

SubselectContext.prototype.enterRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.enterSubselect(this);
	}
};

SubselectContext.prototype.exitRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.exitSubselect(this);
	}
};

SubselectContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SelectVisitor ) {
        return visitor.visitSubselect(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SelectParser.SubselectContext = SubselectContext;

SelectParser.prototype.subselect = function() {

    var localctx = new SubselectContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, SelectParser.RULE_subselect);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 33;
        this.match(SelectParser.T__2);
        this.state = 34;
        this.match(SelectParser.T__0);
        this.state = 35;
        this.fields();
        this.state = 40;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SelectParser.T__1) {
            this.state = 36;
            this.match(SelectParser.T__1);
            this.state = 37;
            this.fields();
            this.state = 42;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 43;
        this.from();
        this.state = 45;
        _la = this._input.LA(1);
        if(_la===SelectParser.T__7) {
            this.state = 44;
            this.where();
        }

        this.state = 47;
        this.match(SelectParser.T__3);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FromContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SelectParser.RULE_from;
    return this;
}

FromContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FromContext.prototype.constructor = FromContext;

FromContext.prototype.FIELD = function() {
    return this.getToken(SelectParser.FIELD, 0);
};

FromContext.prototype.enterRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.enterFrom(this);
	}
};

FromContext.prototype.exitRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.exitFrom(this);
	}
};

FromContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SelectVisitor ) {
        return visitor.visitFrom(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SelectParser.FromContext = FromContext;

SelectParser.prototype.from = function() {

    var localctx = new FromContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, SelectParser.RULE_from);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 49;
        this.match(SelectParser.T__4);
        this.state = 50;
        this.match(SelectParser.FIELD);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function AndContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SelectParser.RULE_and;
    return this;
}

AndContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AndContext.prototype.constructor = AndContext;


AndContext.prototype.enterRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.enterAnd(this);
	}
};

AndContext.prototype.exitRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.exitAnd(this);
	}
};

AndContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SelectVisitor ) {
        return visitor.visitAnd(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SelectParser.AndContext = AndContext;

SelectParser.prototype.and = function() {

    var localctx = new AndContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, SelectParser.RULE_and);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 52;
        this.match(SelectParser.T__5);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OrContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SelectParser.RULE_or;
    return this;
}

OrContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OrContext.prototype.constructor = OrContext;


OrContext.prototype.enterRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.enterOr(this);
	}
};

OrContext.prototype.exitRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.exitOr(this);
	}
};

OrContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SelectVisitor ) {
        return visitor.visitOr(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SelectParser.OrContext = OrContext;

SelectParser.prototype.or = function() {

    var localctx = new OrContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, SelectParser.RULE_or);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 54;
        this.match(SelectParser.T__6);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ArrayconstantContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SelectParser.RULE_arrayconstant;
    return this;
}

ArrayconstantContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ArrayconstantContext.prototype.constructor = ArrayconstantContext;

ArrayconstantContext.prototype.CONSTANT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SelectParser.CONSTANT);
    } else {
        return this.getToken(SelectParser.CONSTANT, i);
    }
};


ArrayconstantContext.prototype.enterRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.enterArrayconstant(this);
	}
};

ArrayconstantContext.prototype.exitRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.exitArrayconstant(this);
	}
};

ArrayconstantContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SelectVisitor ) {
        return visitor.visitArrayconstant(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SelectParser.ArrayconstantContext = ArrayconstantContext;

SelectParser.prototype.arrayconstant = function() {

    var localctx = new ArrayconstantContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, SelectParser.RULE_arrayconstant);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 56;
        this.match(SelectParser.T__2);
        this.state = 57;
        this.match(SelectParser.CONSTANT);
        this.state = 62;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===SelectParser.T__1) {
            this.state = 58;
            this.match(SelectParser.T__1);
            this.state = 59;
            this.match(SelectParser.CONSTANT);
            this.state = 64;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 65;
        this.match(SelectParser.T__3);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FieldsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SelectParser.RULE_fields;
    return this;
}

FieldsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldsContext.prototype.constructor = FieldsContext;

FieldsContext.prototype.subselect = function() {
    return this.getTypedRuleContext(SubselectContext,0);
};

FieldsContext.prototype.FIELD = function() {
    return this.getToken(SelectParser.FIELD, 0);
};

FieldsContext.prototype.enterRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.enterFields(this);
	}
};

FieldsContext.prototype.exitRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.exitFields(this);
	}
};

FieldsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SelectVisitor ) {
        return visitor.visitFields(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SelectParser.FieldsContext = FieldsContext;

SelectParser.prototype.fields = function() {

    var localctx = new FieldsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, SelectParser.RULE_fields);
    try {
        this.state = 69;
        switch(this._input.LA(1)) {
        case SelectParser.T__2:
            this.enterOuterAlt(localctx, 1);
            this.state = 67;
            this.subselect();
            break;
        case SelectParser.FIELD:
            this.enterOuterAlt(localctx, 2);
            this.state = 68;
            this.match(SelectParser.FIELD);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function WhereContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SelectParser.RULE_where;
    return this;
}

WhereContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
WhereContext.prototype.constructor = WhereContext;

WhereContext.prototype.conditionset = function() {
    return this.getTypedRuleContext(ConditionsetContext,0);
};

WhereContext.prototype.enterRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.enterWhere(this);
	}
};

WhereContext.prototype.exitRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.exitWhere(this);
	}
};

WhereContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SelectVisitor ) {
        return visitor.visitWhere(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SelectParser.WhereContext = WhereContext;

SelectParser.prototype.where = function() {

    var localctx = new WhereContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, SelectParser.RULE_where);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 71;
        this.match(SelectParser.T__7);
        this.state = 72;
        this.conditionset();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ConditionsetContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SelectParser.RULE_conditionset;
    return this;
}

ConditionsetContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ConditionsetContext.prototype.constructor = ConditionsetContext;

ConditionsetContext.prototype.condition = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ConditionContext);
    } else {
        return this.getTypedRuleContext(ConditionContext,i);
    }
};

ConditionsetContext.prototype.conditionset = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ConditionsetContext);
    } else {
        return this.getTypedRuleContext(ConditionsetContext,i);
    }
};

ConditionsetContext.prototype.and = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AndContext);
    } else {
        return this.getTypedRuleContext(AndContext,i);
    }
};

ConditionsetContext.prototype.or = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(OrContext);
    } else {
        return this.getTypedRuleContext(OrContext,i);
    }
};

ConditionsetContext.prototype.enterRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.enterConditionset(this);
	}
};

ConditionsetContext.prototype.exitRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.exitConditionset(this);
	}
};

ConditionsetContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SelectVisitor ) {
        return visitor.visitConditionset(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SelectParser.ConditionsetContext = ConditionsetContext;

SelectParser.prototype.conditionset = function() {

    var localctx = new ConditionsetContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, SelectParser.RULE_conditionset);
    var _la = 0; // Token type
    try {
        this.state = 101;
        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 79;
            switch(this._input.LA(1)) {
            case SelectParser.CONSTANT:
            case SelectParser.FIELD:
                this.state = 74;
                this.condition();
                break;
            case SelectParser.T__2:
                this.state = 75;
                this.match(SelectParser.T__2);
                this.state = 76;
                this.conditionset();
                this.state = 77;
                this.match(SelectParser.T__3);
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 92; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 83;
                switch(this._input.LA(1)) {
                case SelectParser.T__5:
                    this.state = 81;
                    this.and();
                    break;
                case SelectParser.T__6:
                    this.state = 82;
                    this.or();
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 90;
                switch(this._input.LA(1)) {
                case SelectParser.CONSTANT:
                case SelectParser.FIELD:
                    this.state = 85;
                    this.condition();
                    break;
                case SelectParser.T__2:
                    this.state = 86;
                    this.match(SelectParser.T__2);
                    this.state = 87;
                    this.conditionset();
                    this.state = 88;
                    this.match(SelectParser.T__3);
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 94; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===SelectParser.T__5 || _la===SelectParser.T__6);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 96;
            this.match(SelectParser.T__2);
            this.state = 97;
            this.conditionset();
            this.state = 98;
            this.match(SelectParser.T__3);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 100;
            this.condition();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ConditionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = SelectParser.RULE_condition;
    return this;
}

ConditionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ConditionContext.prototype.constructor = ConditionContext;

ConditionContext.prototype.FIELD = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SelectParser.FIELD);
    } else {
        return this.getToken(SelectParser.FIELD, i);
    }
};


ConditionContext.prototype.OPERATOR = function() {
    return this.getToken(SelectParser.OPERATOR, 0);
};

ConditionContext.prototype.CONSTANT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(SelectParser.CONSTANT);
    } else {
        return this.getToken(SelectParser.CONSTANT, i);
    }
};


ConditionContext.prototype.ARRAYOPERATOR = function() {
    return this.getToken(SelectParser.ARRAYOPERATOR, 0);
};

ConditionContext.prototype.arrayconstant = function() {
    return this.getTypedRuleContext(ArrayconstantContext,0);
};

ConditionContext.prototype.enterRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.enterCondition(this);
	}
};

ConditionContext.prototype.exitRule = function(listener) {
    if(listener instanceof SelectListener ) {
        listener.exitCondition(this);
	}
};

ConditionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof SelectVisitor ) {
        return visitor.visitCondition(this);
    } else {
        return visitor.visitChildren(this);
    }
};




SelectParser.ConditionContext = ConditionContext;

SelectParser.prototype.condition = function() {

    var localctx = new ConditionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, SelectParser.RULE_condition);
    try {
        this.state = 118;
        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 103;
            this.match(SelectParser.FIELD);
            this.state = 104;
            this.match(SelectParser.OPERATOR);
            this.state = 105;
            this.match(SelectParser.FIELD);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 106;
            this.match(SelectParser.FIELD);
            this.state = 107;
            this.match(SelectParser.OPERATOR);
            this.state = 108;
            this.match(SelectParser.CONSTANT);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 109;
            this.match(SelectParser.CONSTANT);
            this.state = 110;
            this.match(SelectParser.OPERATOR);
            this.state = 111;
            this.match(SelectParser.FIELD);
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 112;
            this.match(SelectParser.CONSTANT);
            this.state = 113;
            this.match(SelectParser.OPERATOR);
            this.state = 114;
            this.match(SelectParser.CONSTANT);
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 115;
            this.match(SelectParser.FIELD);
            this.state = 116;
            this.match(SelectParser.ARRAYOPERATOR);
            this.state = 117;
            this.arrayconstant();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.SelectParser = SelectParser;
