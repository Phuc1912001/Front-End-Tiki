export const isJsonString = (data: any) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}

export const getBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const convertPrice = (price: any) => {
    try {
        const result = price?.toLocaleString().replaceAll(',', '.')
        return `${result} đ`
    } catch (error) {
        return null
    }
}

export const renderOptions = (arr: any) => {
    let results = []
    if (arr) {
        results = arr?.map((opt: any) => {
            return {
                value: opt,
                label: opt
            }
        })
    }
    results.push({
        label: 'Thêm type',
        value: 'add_type'
    })
    return results
}


export const orderContant = {
    delivery: {
        fast: 'FAST',
        gojek: 'GO_JEK'
    },
    payment: {
        later_money: 'Tiền Mặt',
        paypal: 'Thanh toán bằng paypal'
    }
}






