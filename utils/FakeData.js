const apiHomePage = {
    meta: {
        title: '',
        description: '',
        backgroundImage: {
            src: '/image',
            alt: 'name image',
        },
    },
    header: {
        logoSmall: {
            src: '/image',
            alt: 'name image',
        },
        logoLarge: {
            src: '/image',
            alt: 'name image',
        },
        backgroundImage: {
            src: '/image',
            alt: 'name image',
        },
        slogan: 'An tâm với 100% bất động sản được xác thực tại KANGNAM',
        title: 'Lựa Chọn Căn Nhà Ưng Ý Của Bạn',
        suggest: ['vinhomes central park', 'lumiere boulevard', 'glory heights'],
    },
    section1: {
        subTitle: 'CÂU CHUYỆN THƯƠNG HIỆU',
        title: 'Chúng Tôi Là Ai',
        description:
            'Công ty Cổ phần bất động sản Kangnam là đơn vị môi giới bất động sản chuyên nghiệp, chuyên phân phối đa dạng các phân khúc bất động sản trải dài khắp miền Bắc và miền Trung với đội ngũ chuyên viên môi giới giày dạn kinh nghiệm được đào tạo bài bản',
        backgroundImage: {
            src: '/image',
            alt: 'name image',
        },
    },
    section2: {
        title: 'Dự án của chúng tôi',
    },
    section3: {
        backgroundImage: {
            src: '/image',
            alt: 'name image',
        },
        title: 'Kí gửi nhà đất',
        description:
            'Chúng tôi cung cấp dịch vụ kí gửi bất động sản, đáp ứng nhu cầu bán hoặc cho thuê tài sản của quý khách.',
        Criteria: ['Đặt khách hàng làm trọng tâm', 'Dịch vụ nhanh chóng', 'Đảm bảo thực thi'],
    },
    section4: {
        subTitle: 'Tổng hợp các dự án',
        title: 'Dự án nổi bật',
        backgroundImage: {
            src: '/image',
            alt: 'name image',
        },
    },
    section5: {
        backgroundImage: {
            src: '/image',
            alt: 'name image',
        },
        title: 'Nổi bật theo khu vực',
    },
    section6: {
        backgroundImage: {
            src: '/image',
            alt: 'name image',
        },
        subTitle: 'Tổng hợp các dự án',
        title: 'Đối tác của chúng tôi',
        listPartner: [{ src: '', alt: '' }],
    },
    section7: {
        subTitle: 'Tổng hợp các dự án',
        title: 'Tin tức mới nhất',
    },
}

const apiDetailProject = [
    {
        thumbnail: {
            src: '/image',
            alt: 'name image',
        },
        title: 'Nhà phố Thủy Nguyên full nội thất',
        slug: 'nha-pho-thuy-nguyen-full-noi-that',
        status: 'Thuê',
        address: 'Tôn Đức Thắng, Hà Nội',
        area: '52m2 (10m x 5.2m)',
        price: '25 Tỷ',
    },
]

const apiDetailNews = [
    {
        thumbnail: {
            src: '/image',
            alt: 'name image',
        },
        title: 'Nghệ An sắp đấu giá hơn 100 lô đất, khởi điểm 1 triệu đồng/m2',
        slug: 'nghe-an-...',
        status: 'Thị trường',
        description:
            'Buổi đấu giá 121 lô đất tại các huyện Nam Đàn, Thanh Chương, Yên Thành, thị xã Thái Hòa và thị trấn Hưng Nguyên (tỉnh Nghệ An) sẽ được tổ chức vào các ngày cuối tháng 7 và đầu tháng 8 tới. Giá khởi điểm thấp nhất từ hơn 260 triệu đồng/lô.',
        date: '21/07/2023 - 11:23',
    },
]

// - API Search
// - API lọc - phân trang - mới nhất (cũ nhất)
// - Gợi ý - home page
// - Alt của ảnh
// - up svg được không ?
// - API chi tiết dự án
// -zoom marker
// -danh sách dự án trong bán kính đấy
// -Dự án nổi bật - cms có chọn được bài tuỳ ý ko
;('https://mtf.onepay.vn/paygate/vpcpay.op?vpc_Version=2&vpc_Currency=VND&vpc_Command=pay&vpc_AccessCode=6BEB2566&vpc_Merchant=TESTONEPAY32&vpc_Locale=vn&vpc_ReturnURL=http://localhost:3000/&vpc_MerchTxnRef=duc210601&vpc_OrderInfo=ducmuaquanao&vpc_Amount=1000000&vpc_TicketNo=113.23.74.46&AgainLink=http://localhost:3000/&Title=KANGNAMPAY&vpc_SecureHash=6D0870CDE5F24F34F3915FB0045120D6')
