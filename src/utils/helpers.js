export const getSorterObject = (sorter) => {
    let key = sorter.columnKey;
    console.log('while creating object',key);
    if(key !== undefined){
        let order = sorter.order;
        let obj = {
        [key] : order === 'ascend' ? 'asc' : order === 'descend' ? 'desc' : undefined
    }
    return obj;
    }
}

export const removeUndefinedFromObject = obj => {
    let cleanObj;
    Object.keys(obj).forEach(key => {
        if(obj[key]){
            let temp_obj = {
                ...cleanObj,
                [key] : obj[key]
            }
            cleanObj = temp_obj
        }
    })
    return cleanObj
}

export const getPageMetaObject = page_meta => {
    return {
        page : page_meta.current_page,
        total : page_meta.total,
        pages : page_meta.total / page_meta.per_page
    }
}