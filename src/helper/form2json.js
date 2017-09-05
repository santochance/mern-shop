export function getDeep(base, segments) {
  let [obj, prop] = accessDeep(base, segments)
  return obj[prop]
}

export function setDeep(base, segments, value, keepBase = true) {
  let [obj, prop] = accessDeep(base, segments)
  obj[prop] = value
  return keepBase ? base : obj
}

export function accessDeep(base, segments) {
  let segs, prop
  segs = Array.isArray(segments) ? segments.slice() : segments.split('.')
  prop = segs.pop()

  let key
  let obj = base
  while (key = segs.shift()) {
    obj = obj[key] || (obj[key] = {})
  }
  return [obj, prop]
}

export function form2json(form) {
  let controls = form.elements
  let names = Object.keys(controls).filter(key => isNaN(Number(key)))
  let rst = names.reduce((data, name) => {
    let control = controls[name]
    if (control instanceof RadioNodeList) {

      let ctrlList = Array.from(control).reduce((arr, ctrl) => {
        let value = getCtrlValue(ctrl)
        return value ? [...arr, value] : arr
      }, [])

      // console.log('multiple controls with same name')
      console.log('name: %s, value:%s', name, ctrlList)

      // return {...data,
      //   [name]: ctrlList.length > 1 ? ctrlList : ctrlList[0]
      // }

      return setDeep(data, name, ctrlList.length > 1 ? ctrlList : ctrlList[0])
    } else {
      let value = getCtrlValue(control)

      // console.log('signle control')
      console.log('name: %s, value:%s', name, value)

      // return {...data,
      //   [name]: value ? value : ''
      // }
      return setDeep(data, name, value ? value : '')
    }
  }, {})
  return rst
}

export function form2formData(form) {
  let controls = form.elements
  let names = Object.keys(controls).filter(key => isNaN(Number(key)))
  let rst = names.reduce((data, name) => {
    let control = controls[name]
    if (control instanceof RadioNodeList) {

      let ctrlList = Array.from(control).reduce((arr, ctrl) => {
        let value = getCtrlValue(ctrl)
        return value ? [...arr, value] : arr
      }, [])

      // console.log('multiple controls with same name')
      console.log('name: %s, value:%s', name, ctrlList)

      // return {...data,
      //   [name]: ctrlList.length > 1 ? ctrlList : ctrlList[0]
      // }

      return setDeep(data, name, ctrlList.length > 1 ? ctrlList : ctrlList[0])
    } else {
      let value = getCtrlValue(control)

      // console.log('signle control')
      console.log('name: %s, value:%s', name, value)

      // return {...data,
      //   [name]: value ? value : ''
      // }
      return setDeep(data, name, value ? value : '')
    }
  }, new FormData)
  return rst
}

export function form2json_old(form) {
  let controls = form.elements
  let names = Object.keys(controls).filter(key => isNaN(Number(key)))
  let rst = names.reduce((data, name) => {
    let control = controls[name]
    if (control instanceof RadioNodeList) {
      console.log('multiple controls with same name: %s', name)

      let ctrlList = Array.from(control).reduce((arr, ctrl) => {
        let value = getCtrlValue(ctrl)
        return value ? [...arr, value] : arr
      }, [])
      // data[name] = ctrlList.length > 1 ? ctrlList : ctrlList[0]
      return {...data,
        [name]: ctrlList.length > 1 ? ctrlList : ctrlList[0]
      }
    } else {
      console.log('signle control with name: %s', name)
      let value = getCtrlValue(control)
      // data[name] = value ? value : ''
      return {...data,
        [name]: value ? value : ''
      }
    }
  }, {})
  return rst
}

/*
getCtrlValue() 返回值表
  checkbox, radio  undefined, String<value>
  select-multiple  [], [...opts]
  file-multiple    [], [...files]
  其他             String<value>
  <value>本身是String, 可能是'', 或非空字符串
*/
export function getCtrlValue(ctrl) {
  let rst
  if (ctrl.type === 'checkbox' || ctrl.type === 'radio') {
    rst = ctrl.checked ? ctrl.value : undefined
  } else if (ctrl.type === 'select-multiple') {
    console.log('it is a multiple selection: "%s', ctrl)
    var opts = ctrl.options.reduce((arr, opt) => opt.selected ? [...arr, opt.value] : arr,
    [])
    // 是否需要把 [] 转换为undefined或''？

    // [] --> undefined
    // [value] =-> value
    // [...values] --> <self>
    rst = opts.length > 1 ? opts : opts[0]
  } else if (ctrl.type === 'file' && ctrl.multiple) {
    console.log('it is a multiple file-uploader: "%s', ctrl)
    // 没有选择file, 隐式返回undefined
    if (!ctrl.value) {
      // 提取base path
      // 要区分windows和unix风格, 暂时固定为windows风格
     var base =   ctrl.value.split('\\').splice(0, -1)
      // 这里没有做与select相似的处理
      rst = ctrl.files.map(file => base + file.name)
    }
  } else {
   rst = ctrl.value
  }
  return rst
}
