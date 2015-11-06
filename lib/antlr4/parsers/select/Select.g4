//Copyright (c) 2015 Benjamin Vellacott
//
//Permission is hereby granted, free of charge, to any person obtaining a copy of
//this software and associated documentation files (the "Software"), to deal in
//the Software without restriction, including without limitation the rights to
//use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
//of the Software, and to permit persons to whom the Software is furnished to do
//so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.

// This is the grammar used to generate the select lexer and parser using the 
// antlr4 tool

grammar Select;

select 
	: 'select' fields (',' fields)* from (where)?
	;

subselect 
	: '(' 'select' fields (',' fields)* from (where)? ')'
	;

from 
	: 'from' FIELD
	;

and 
	: 'and'
	;

or 
	: 'or'
	;
	
OPERATOR 
	: '<'
	| '<='
	| '>'
	| '>='
	| '='
	;

ARRAYOPERATOR 
	: 'in'
	;

CONSTANT 
	: [+-]?[0-9]+[.]*[0-9]*
	| 'true'
	| 'false'
	| 'null'
	| '\'' .*? '\''
	;
 
FIELD 
	: [a-zA-Z_]+ 
	;

arrayconstant 
	: '(' CONSTANT (',' CONSTANT)* ')'
	;
	
fields 
	: subselect 
	| FIELD
	;

where 
	: 'where' conditionset
	;

conditionset 
	: (condition|'(' conditionset ')') ((and|or) (condition|'(' conditionset ')'))+
	| '(' conditionset ')'
	| condition
	;

condition 
	: FIELD OPERATOR FIELD
	| FIELD OPERATOR CONSTANT
	| CONSTANT OPERATOR FIELD
	| CONSTANT OPERATOR CONSTANT	
	| FIELD ARRAYOPERATOR arrayconstant	
	;

// Whitespace is ignored 
WS 
	: [ \t\r\n]+ -> skip 
	; 
