// Constructors and object instances
export function APIfeatures(query, queryString) {
    this.query = query; //Products.find()
    this.queryString = queryString //req.query

    this.paginating = () => {
        // req.query : dùng để lấy các giá trị đằng sau ? ví dụ: http://localhost:5000/api/products?page=2&limit=7 
        // trả về: { page: '2', limit: '7' }
        // req.query.page sẽ trả về dưới dạng string nên phải *1 để cover thành int
        const page = queryString.page * 1 || 1
        const limit = queryString.limit * 1 || 5

        // limit(x) : lấy x sản phẩm trong 1 lần
        // skip(0,x,2x,...) : phân trang theo limit(x) ví dụ limit(0): lấy x sản phẩm đầu, limit(x): lấy x sản phẩm tiếp theo,... 
        const skip = limit * (page - 1)

        this.query = query.limit(limit).skip(skip)
        return this;
    }

    this.sorting = () => {
        const sort = queryString.sort || 'createdAd'
        this.query = this.query.sort(sort)
        return this;
    }

    this.searching = () => {
        const search = queryString.search;
        if (search) {
            this.query = this.query.find({
                $text: { $search: search }
            })
        } else {
            this.query = this.query.find()
        }
        return this;
    },

        this.filtering = () => {

            const queryObj = { ...this.queryString }
            // Khi nhận query  thì sẽ nhận luôn cái giá trị của các hàm bên trên 
            // Tạo một mảng có chứa các giá trị có thể bị lặp
            const excludedFields = ['page', 'sort', 'limit', 'search']
            // Lặp qua và bỏ queryObj  các từ khóa giống trong mảng excludedFields 
            excludedFields.forEach(el => delete (queryObj[el]))

            // Chuyển object nhận được sang string vì hàm replace chỉ dùng đc ở string
            let queryStr = JSON.stringify(queryObj)
            queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

            //parse lại và tìm lọc 
            this.query = this.query.find(JSON.parse(queryStr))

            return this;
        }
}