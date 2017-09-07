const should = require('should')

function strMatchRe(str) {
  return !!str.match(new RegExp(str))
}

strMatchRe('abc').should.true()
strMatchRe('a/b/c').should.true()
strMatchRe('a\b\c').should.true()
strMatchRe('a\\b\\c').should.false()
strMatchRe('a\\\\b\\\\c').should.false()
'a\\b\\c'.should.match(new RegExp('a\\\\b\\\\c'))

// 字符串和RE均使用'\\'表示一个`\`, 所以用字符串产生RE时需要使用双重转义, 即用'\\\\'表示/\\/中的'\\'

function strMatchReFixed(str) {
  return !!str.match(new RegExp(str.replace(/\\/g, '\\\\')))
}

strMatchReFixed('abc').should.true()
strMatchReFixed('a/b/c').should.true()
strMatchReFixed('a\b\c').should.true()
strMatchReFixed('a\\b\\c').should.true()
strMatchReFixed('a\\\\b\\\\c').should.true()

// > 'abc'.match('abc')
// [ 'abc', index: 0, input: 'abc' ]
// > 'a\b\c'.match('a\b\c')
// [ 'a\bc', index: 0, input: 'a\bc' ]
// > 'a\\b\\c'.match('a\\b\\c')
// null
// > 'a\\b\\c'.match('a\\\\b\\\\c')
// [ 'a\\b\\c', index: 0, input: 'a\\b\\c' ]

