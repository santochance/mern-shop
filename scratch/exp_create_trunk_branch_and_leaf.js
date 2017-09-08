function createLeaf(parent, childCount) {
  let children = Array(childCount).fill({
    content: 'something',
    parent,
    count: 1
  })
  parent.children = children
  return parent
}

function createBranch(parent, childCount) {
  let children = Array(childCount).fill(
    children: undefined
    parent,
    count: undefined
  )
  parent.children = children
  return parent
}

function createTrunk() {
  return {
    children: undefined,
    parent: null,
    count: undefined,
  }
}
function grow(array) {
  let iter = array.values()
  let entity = iter.next()

  let trunk = createTrunk()

  // 给trunk添加branch
  if (!entity.done) {
    createBranch(trunk, iter.value)
  }

  // 给branch再添加子branch
  entity = iter.next()
  if (!entity.done) {
    trunk.children.forEach(branch => {
      createBranch(branch, iter.value)
    })
  }

  grow(truck, level, array) {
    while (array[level]--) {
      createBranch(trunk, iter.value)
    }
  }
}

parent.push(createBranch(parent, array[level]))


[
  [
    [
      [1,2,3,4,5], [2,3,4,5], [3,4,5,6], [4,5,6,7]
    ],
    [
      [1,2,3,4], [2,3,4,5], [3,4,5,6], [4,5,6,7]
    ],
    [
      [1,2,3,4], [2,3,4,5], [3,4,5,6], [4,5,6,7]
    ],
  ],
  [
    [
      [1,2,3,4], [2,3,4,5], [3,4,5,6], [4,5,6,7]
    ],
    [
      [2,3,4,5], [3,4,5,6], [4,5,6,7], [5,6,7,8]
    ],
    [
      [3,4,5,6], [4,5,6,7], [5,6,7,8], [6,7,8,9]
    ],
  ],
]

[
  [
    [10, 14, 18, 22],
    [14, 18, 22, 26],
    [18, 22, 26, 30],
  ]
]

{

}


{
  1:
  1:
  2: [

  ]
  3: [
    [10, 14, 18, 22],
    [14, 18, 22, 26],
    [18, 22, 26, 30],
  ]
  4: [
    [1,2,3,4,5],
    [],
    [],
    []
  ]
}

[3][1]
[3][2]
[3][3]

[3][1][1]
[3][1][2]

[1,2,3,4], [2,3,4,5], [3,4,5,6]    [2,3,4,5], [3,4,5,6], [4,5,6,7]

[10, 14, 18]   [14,18,22]

[42] [54]

96



createBranch(branch, array[level])


level = 3

1
2
3
4
count[1][2][3][4] = 6

[
  [

  ],
  [
    [], [],
    [
      ?, ?, ?, 6
    ]
  ]
]

[1], 96

[2], [42], [54]

[3], [10, 14, 18], [14, 18, 12]

[4], [[1,2,3,4], [2,3,4,5], [3,4,5,6]], [[2,3,4,5], [3,4,5,6], [4,5,6,7]]


15
[6, 9]
[1,2,3], [2,3,4]


[1,
  [96]
]
[2,
  [
    42, 54
  ]
]

[3,
  [
    10, 14, 18
  ],
  [
    14, 18, 12
  ]
]

[4,
  [
    [
      1,2,3,4
    ],
    [
      2,3,4,5
    ]
  ],
  [
  ],
  [
  ]
]

[]

[] []

[[10, 14, 18]] [[]]

[[[1,2,3,4] [1,2,3,4] [1,2,3,4] [1,2,3,4]], []]]

36

[18], [18]

[[6], [6], [6]], [[], [], []]

ijk
[[[3, 3, 3, 3]]]

ij
[[12, 12, 12]]

i
[24, 24]

tree[]
  1
i 2
j 3
k 4

tree[0]
tree[1]
tree[2]
tree[3]

l





[
  64,
  [32, 32],
  [[16, 16, 16], [16, 16, 16]],
  [[[1,2,3,4], [2,3,4,5], [3,4,5,6]], [[1,2,3,4], [2,3,4,5], [3,4,5,6]]                                                                                                                                                                                                                                                                                                                                                                                                                                    ],
]


tree = [
  64,
  [32, 32],
]

Array(2).fill(Array(3))

1 Array(2).fill()
2 Array(2).fill(Array(3).fill())
3 Array(2).fill(Array(3).fill(Array(4).fill()))
4 Array(2).fill(Array(3).fill(Array(4).fill(Array(5).fill())))

while (l--) {
  recur(4)
}


return Array(l++).fill(recur(l))

function recur(n) {
  if (l) {
    return Array(l++).fill(recur(l))
  } else {
    return 1
  }
}

l = 4
function recur(n) {
  if (n >= l) return 1
  return Array(n).fill(recur(n++))
}

Array(2).fill(1)
Array(3).fill(Array(2).fill(1))


function recur(n) {
  if (n >= l) return 1
  return Array(n).fill(recur(n++))
}

recur(4)

recur(3)
