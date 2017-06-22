'use strict';

module.exports = [
  {
    name: 'object with numeric literals',
    value: { 42: true },
    serialized: '{42:true}'
  },
  {
    name: 'object with unquoted keys',
    value: { $: 'dollar', _$_: 'multiple symbols' },
    serialized: '{$:\'dollar\',_$_:\'multiple symbols\'}'
  },
  {
    name: 'object with unicode unquoted key',
    value: { ümlåût: 'that\'s not really an ümlaüt, but this is' },
    serialized: '{ümlåût: \'that\\\'s not really an ümlaüt, but this is\'}'
  }
];
