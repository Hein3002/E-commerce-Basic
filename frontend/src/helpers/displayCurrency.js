const displayVNDCurrency = (num)=>{
    const fomatter = new Intl.NumberFormat('vi-VN',{
        style : "currency",
        currency : 'VND',
        minimumFractionDigits :0
    })
    return fomatter.format(num)
}
export default displayVNDCurrency