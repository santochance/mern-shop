

初时5个

然后最多增至7个, 2 + 5

假设共20页

~prev~, '1', 2, 3, 4, 5, ..., next

...

prev, 1, 2, '3', 4, 5, ..., next


prev, 1, 2, 3, '4', 5, 6, ..., next


prev, 1, 2, 3, 4, '5', 6, 7 ..., next

prev, 1, 2, ..., 4, 5, '6', 7, 8 ..., next


prev, 1, 2, ..., 10, 11, '12', 13, 14, ..., next

prev, 1, 2, ..., 16, 17, '18', 19, 20, next

...

prev, 1, 2, ..., 16, 17, 18, 19, '20', ~next~

// 当前index
index

headSize = 2
mainSize = 5

left mid right

奇数
  mid = (right - left) / 2 + 1
偶数（偏右）
  mid = (right - left + 1) / 2

奇数个 Math.round(size / 2)
偶数个

// 当前 index 作为 mid
// 根据mid推算出left, right
// left与headSize比较
// 当left小于headSize时，left出现在前头保留位

mid == 5, left == 3

left
1    0个
2    1个
3    2个
4    2个

if (left > headSize) {
  // 渲染 2 + 5个
} else {
  取正数(left - headSize + 1)
}

画...的左边界是headSize + 1
右边界是total

page的左边界是 1, 右边界是total

index
left
right

if (index === 1) {
  disabled prev
}
if (index === total) {
  disabled next
}

if (left > headSize) {
  Array(headSize).
} else {
  head = left - headSize + 1
  head = head > 0 ? head : 0
  Array(head)
}

if (left <= 3) {
  no left ...
}
if (right >= total) {
  no right ...
}

// left ... right
