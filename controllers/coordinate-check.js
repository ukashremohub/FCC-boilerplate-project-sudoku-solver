function CoordinateChecker (){

    this.getCellPosition = (input) => { // RETURN ARR [row, column], FALSE IF INVALID
        let arr = input.split('')
        if(arr.length !== 2) return false
        let regex1 = /[^A-Ia-i]/
        let regex2 = /[^1-9]/
        if(regex1.test(arr[0]) || regex2.test(arr[1])) return false
        let column = arr[1]
        let row

        switch(arr[0].toUpperCase()){
            case 'A':
                row = 1
                break
            case 'B':
                row = 2
                break
            case 'C':
                row = 3
                break
            case 'D':
                row = 4
                break
            case 'E':
                row = 5
                break
            case 'F':
                row = 6
                break
            case 'G':
                row = 7
                break
            case 'H':
                row = 8
                break
            case 'I':
                row = 9
                break
            default:
                return false
        }

        return [row,column]
    }

}

module.exports = CoordinateChecker;