var Mock = require('mockjs')

export function test() {
    Mock.mock("/login", function(options) {
        return {
            "name": "qingyy",
            "id": 1,
            "user": 1,
            "password": 2,
            "statu": 200,
        }
    })
}

