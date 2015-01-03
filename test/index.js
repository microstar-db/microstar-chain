'use strict';

var test = require('tape')
var r = require('ramda')
var rimraf = require('rimraf')
var mChain = require('../')
var mCrypto = require('../../microstar-crypto')
var level = require('level-test')()
var pull = require('pull-stream')
var pl = require('pull-level')

var dbContents
// rimraf.sync('./test.db')
var db1 = level('./test1.db', { valueEncoding: 'json' })

// rimraf.sync('./test2.db')
var db2 = level('./test2.db', { valueEncoding: 'json' })

mCrypto.keys('h4dfDIR+i3JfCw1T2jKr/SS/PJttebGfMMGwBvhOzS4=', function (err, keys) {
  tests(keys)
})

function tests (keys) {
  var messages = [{
    content: 'Fa',
    timestamp: 1418804138168,
    type: 'holiday-carols:syllable',
    chain_id: 'holiday-carols:2014'
  }, {
    content: 'La',
    timestamp: 1418804138169,
    type: 'holiday-carols:syllable',
    chain_id: 'holiday-carols:2014'
  }, {
    content: 'Laa',
    timestamp: 1418804138170,
    type: 'holiday-carols:syllable',
    chain_id: 'holiday-carols:2014'
  }]

  test('write', function (t) {

    pull(
      pull.values(messages),
      mChain.write({
        crypto: mCrypto,
        keys: keys,
        db: db1,
        indexes: mChain.indexes
      }, function (err) {
        t.error(err)

        pull(
          pl.read(db1),
          pull.collect(function (err, arr) {
            t.error(err)
            t.deepEqual(arr, dbContents, '.write(db, indexes)')
            t.end()
          })
        )
      })
    )


    dbContents = [{
      key: '31+k7zPSRtH22OZxA4RXQRNQJ42gay0LNcGSUt19JhS/RElqw/O28+eRUQQdKJvSiQNjU1I5hyHf9OG7I1Np3g==',
      value: {
        chain_id: 'holiday-carols:2014',
        content: 'La',
        previous: 'LWTQmsJ1E9fu+gSXDM03ckBXieL9/K8Jl2claIRcC6FFX5WYd1ojDsgo6KK1GafCinq2lAQlsIeVtU4RSpYL1w==',
        pub_key: 'N3DyaY1o1EmjPLUkRQRu41/g/xKe/CR/cCmatA78+zY=7XuCMMWN3y/r6DeVk7YGY8j/0rWyKm3TNv3S2cbmXKk=',
        sequence: 1,
        signature: '/v1TqoggUpzuFx5sJ5jirlQsBOpGQBb1DJwP4ue1S5LzqKXIvZvlFe/WOLjyQTKXkqw9uQo2NH7eJPq4E7HbAQ==',
        timestamp: 1418804138169,
        type: 'holiday-carols:syllable'
      }
    }, {
      key: 'GiOiA+oDfBMpk1EO3GpedGHtI3uMUbnfmsXvy5hQlLy2lKQhgIYxUyOAJRH8dBGPZe3Y8NErr6k7umgEF3pBtA==',
      value: {
        chain_id: 'holiday-carols:2014',
        content: 'Laa',
        previous: '31+k7zPSRtH22OZxA4RXQRNQJ42gay0LNcGSUt19JhS/RElqw/O28+eRUQQdKJvSiQNjU1I5hyHf9OG7I1Np3g==',
        pub_key: 'N3DyaY1o1EmjPLUkRQRu41/g/xKe/CR/cCmatA78+zY=7XuCMMWN3y/r6DeVk7YGY8j/0rWyKm3TNv3S2cbmXKk=',
        sequence: 2,
        signature: '+2r2xOcwEsP/h2inzDYx3OX2jk+03Zjnhp7pdagNcDFAE/fhdTX4Zmdx+Vi+divPumjIvHQYNSzy4qBI9c4dAQ==',
        timestamp: 1418804138170,
        type: 'holiday-carols:syllable'
      }
    }, {
      key: 'LWTQmsJ1E9fu+gSXDM03ckBXieL9/K8Jl2claIRcC6FFX5WYd1ojDsgo6KK1GafCinq2lAQlsIeVtU4RSpYL1w==',
      value: {
        chain_id: 'holiday-carols:2014',
        content: 'Fa',
        previous: null,
        pub_key: 'N3DyaY1o1EmjPLUkRQRu41/g/xKe/CR/cCmatA78+zY=7XuCMMWN3y/r6DeVk7YGY8j/0rWyKm3TNv3S2cbmXKk=',
        sequence: 0,
        signature: 'Cs8s0zZgqE/Tp+DCFDXuMYA6mNUtPTFGf//5rENPCx37g3L7BFhz0pBJ06GFK5E1i3C6o5H9BgX/Ltppf5EFBQ==',
        timestamp: 1418804138168,
        type: 'holiday-carols:syllable'
      }
    }, {
      key: 'ÿpub_key,chain_id,sequenceÿN3DyaY1o1EmjPLUkRQRu41/g/xKe/CR/cCmatA78+zY=7XuCMMWN3y/r6DeVk7YGY8j/0rWyKm3TNv3S2cbmXKk=ÿholiday-carols:2014ÿ0ÿLWTQmsJ1E9fu+gSXDM03ckBXieL9/K8Jl2claIRcC6FFX5WYd1ojDsgo6KK1GafCinq2lAQlsIeVtU4RSpYL1w==ÿ',
      value: 'LWTQmsJ1E9fu+gSXDM03ckBXieL9/K8Jl2claIRcC6FFX5WYd1ojDsgo6KK1GafCinq2lAQlsIeVtU4RSpYL1w=='
    }, {
      key: 'ÿpub_key,chain_id,sequenceÿN3DyaY1o1EmjPLUkRQRu41/g/xKe/CR/cCmatA78+zY=7XuCMMWN3y/r6DeVk7YGY8j/0rWyKm3TNv3S2cbmXKk=ÿholiday-carols:2014ÿ1ÿ31+k7zPSRtH22OZxA4RXQRNQJ42gay0LNcGSUt19JhS/RElqw/O28+eRUQQdKJvSiQNjU1I5hyHf9OG7I1Np3g==ÿ',
      value: '31+k7zPSRtH22OZxA4RXQRNQJ42gay0LNcGSUt19JhS/RElqw/O28+eRUQQdKJvSiQNjU1I5hyHf9OG7I1Np3g=='
    }, {
      key: 'ÿpub_key,chain_id,sequenceÿN3DyaY1o1EmjPLUkRQRu41/g/xKe/CR/cCmatA78+zY=7XuCMMWN3y/r6DeVk7YGY8j/0rWyKm3TNv3S2cbmXKk=ÿholiday-carols:2014ÿ2ÿGiOiA+oDfBMpk1EO3GpedGHtI3uMUbnfmsXvy5hQlLy2lKQhgIYxUyOAJRH8dBGPZe3Y8NErr6k7umgEF3pBtA==ÿ',
      value: 'GiOiA+oDfBMpk1EO3GpedGHtI3uMUbnfmsXvy5hQlLy2lKQhgIYxUyOAJRH8dBGPZe3Y8NErr6k7umgEF3pBtA=='
    }]
  })


  // Seed node1 with all messages (two chains)
  // Seed node2 with part of one of the chains
  // Hardcode stream with continuation of chain and new chain
  // This tests all paths in validateMessages
  test('validate', function (t) {
    var node1_messages = [
    // This already exists in node2_db
    {
      content: 'Fa',
      timestamp: 1418804138168,
      type: 'holiday-carols:syllable',
      chain_id: 'holiday-carols:2014'
    }, {
      content: 'La',
      timestamp: 1418804138169,
      type: 'holiday-carols:syllable',
      chain_id: 'holiday-carols:2014'
    },
    // All of this stuff is new
    {
      content: 'Laa',
      timestamp: 1418804138170,
      type: 'holiday-carols:syllable',
      chain_id: 'holiday-carols:2014'
    }, {
      content: 'Ding',
      timestamp: 1418804135476,
      type: 'holiday-carols:bells',
      chain_id: 'holiday-carols:2013'
    }, {
      content: 'Dong',
      timestamp: 1418804135476,
      type: 'holiday-carols:bells',
      chain_id: 'holiday-carols:2013'
    }]


    pull(
      pull.values(messages),
      mChain.write({
        crypto: mCrypto,
        keys: keys,
        db: db1,
        indexes: mChain.indexes
      }, function (err) {
        t.error(err)

        pull(
          mChain.read(),
          pull.collect(function (err, arr) {
            t.error(err)
            t.deepEqual(arr, dbContents, '.write(db, indexes)')
            t.end()
          })
        )
      })
    )

    var node2_db = [{
      key: '31+k7zPSRtH22OZxA4RXQRNQJ42gay0LNcGSUt19JhS/RElqw/O28+eRUQQdKJvSiQNjU1I5hyHf9OG7I1Np3g==',
      value: {
        chain_id: 'holiday-carols:2014',
        content: 'La',
        previous: 'LWTQmsJ1E9fu+gSXDM03ckBXieL9/K8Jl2claIRcC6FFX5WYd1ojDsgo6KK1GafCinq2lAQlsIeVtU4RSpYL1w==',
        pub_key: 'N3DyaY1o1EmjPLUkRQRu41/g/xKe/CR/cCmatA78+zY=7XuCMMWN3y/r6DeVk7YGY8j/0rWyKm3TNv3S2cbmXKk=',
        sequence: 1,
        signature: '/v1TqoggUpzuFx5sJ5jirlQsBOpGQBb1DJwP4ue1S5LzqKXIvZvlFe/WOLjyQTKXkqw9uQo2NH7eJPq4E7HbAQ==',
        timestamp: 1418804138169,
        type: 'holiday-carols:syllable'
      }
    }, {
      key: 'LWTQmsJ1E9fu+gSXDM03ckBXieL9/K8Jl2claIRcC6FFX5WYd1ojDsgo6KK1GafCinq2lAQlsIeVtU4RSpYL1w==',
      value: {
        chain_id: 'holiday-carols:2014',
        content: 'Fa',
        previous: null,
        pub_key: 'N3DyaY1o1EmjPLUkRQRu41/g/xKe/CR/cCmatA78+zY=7XuCMMWN3y/r6DeVk7YGY8j/0rWyKm3TNv3S2cbmXKk=',
        sequence: 0,
        signature: 'Cs8s0zZgqE/Tp+DCFDXuMYA6mNUtPTFGf//5rENPCx37g3L7BFhz0pBJ06GFK5E1i3C6o5H9BgX/Ltppf5EFBQ==',
        timestamp: 1418804138168,
        type: 'holiday-carols:syllable'
      }
    }, {
      key: 'ÿpub_key,chain_id,sequenceÿN3DyaY1o1EmjPLUkRQRu41/g/xKe/CR/cCmatA78+zY=7XuCMMWN3y/r6DeVk7YGY8j/0rWyKm3TNv3S2cbmXKk=ÿholiday-carols:2014ÿ0ÿLWTQmsJ1E9fu+gSXDM03ckBXieL9/K8Jl2claIRcC6FFX5WYd1ojDsgo6KK1GafCinq2lAQlsIeVtU4RSpYL1w==ÿ',
      value: 'LWTQmsJ1E9fu+gSXDM03ckBXieL9/K8Jl2claIRcC6FFX5WYd1ojDsgo6KK1GafCinq2lAQlsIeVtU4RSpYL1w=='
    }, {
      key: 'ÿpub_key,chain_id,sequenceÿN3DyaY1o1EmjPLUkRQRu41/g/xKe/CR/cCmatA78+zY=7XuCMMWN3y/r6DeVk7YGY8j/0rWyKm3TNv3S2cbmXKk=ÿholiday-carols:2014ÿ1ÿ31+k7zPSRtH22OZxA4RXQRNQJ42gay0LNcGSUt19JhS/RElqw/O28+eRUQQdKJvSiQNjU1I5hyHf9OG7I1Np3g==ÿ',
      value: '31+k7zPSRtH22OZxA4RXQRNQJ42gay0LNcGSUt19JhS/RElqw/O28+eRUQQdKJvSiQNjU1I5hyHf9OG7I1Np3g=='
    }]


  })

  test('copy', function (t) {
    var initial = dbContents[2].value
    var values = [dbContents[2].value, dbContents[0].value, dbContents[1].value]

    pull(
      pull.values(values),
      mChain.copy({
        crypto: mCrypto,
        keys: keys,
        db: db2,
        indexes: mChain.indexes
      }, initial, function (err) {
        t.error(err)

        pull(
          pl.read(db2),
          pull.collect(function (err, arr) {
            t.error(err)
            t.deepEqual(arr, dbContents, '.write(db, indexes)')
            t.end()
          })
        )
      })
    )
  })

//   test('read', function (t) {

//   })
}