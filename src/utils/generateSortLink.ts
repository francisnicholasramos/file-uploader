export const generateSortLink = (
    prevSortQuery: Record<string, string>,
    property: 'name' | 'size' | 'createdAt',
    isFirstQuery = true
) => {
    const currentOrder = prevSortQuery[property]
    
    let orderBy: string

    if (!currentOrder) {
        orderBy = 'asc' 
    } else if (currentOrder === 'asc') {
        orderBy = 'desc' 
    } else {
        orderBy = ''     // no sort (default)
    }
    
    const newSortQuery = orderBy ? `${property}_${orderBy}` : ''
    return `${isFirstQuery ? '?' : '&'}sort=${newSortQuery}`
}
