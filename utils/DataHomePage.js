//Đa ngôn ngữ : Việt + Anh + Trung + Hàn

// - API Search theo:
// + mua nhà
// + thuê nhà
// +dự án
// -------------------------------------

// - API tiền tệ
// -------------------------------------

// - API danh sách dự án, lọc theo:
// + Loại hình => có các mục lọc nhỏ theo: ['Nhà mặt phố', 'Chung cư', 'Văn phòng', 'Phân xưởng', 'Đất nền']
// + Địa điểm => có các mục lọc nhỏ theo: ['Hà nội','Hà nam','TP. Hồ Chí Minh','Nghệ An','Quảng Ninh','Hà Tĩnh','Sơn La','Đắk Lắk','Lâm Đồng','Ninh Thuận']
// + Cho thuê => có các mục lọc nhỏ theo:['Thuê căn hộ','Thuê Sinh Viên','Thuê nhà phố','Thuê Studio','Thuê đất nền','Thuê Office-tel',]
// + Mua lại => có các mục lọc nhỏ theo:['Căn hộ', 'Nhà phố', 'Đất nền', 'Studio', 'Sinh Viên', 'Office-tel']
// + Dự án mới nhất
// + Dự án có giá từ cao xuống thấp
// + Dự án có giá từ thấp đến cao
// Hỗ trợ phân trang
// -------------------------------------

// - API danh sách tin tức, lọc theo:
// + Thị trường
// + Môi giới
// + Tư vấn
// + Bài viết mới nhất
// Hỗ trợ phân trang
// -------------------------------------

// - API Map, marker lọc theo thành phố/tỉnh - quận/huyện - phường/xã

const apiHomePage = {
    meta: {
        title: '',
        description: '',
        background: {
            src: '/image',
            alt: '',
        },
    },
    header: {
        logoSmall: {
            src: '/image',
            alt: '',
        },
        logoLarge: {
            src: '/image',
            alt: '',
        },
        slideBanner: [
            {
                src: '/image',
                alt: '',
            },
        ],
        slogan: 'An tâm với 100% bất động sản được xác thực tại KANGNAM',
        title: 'Lựa Chọn Căn Nhà Ưng Ý Của Bạn',
        suggest: ['vinhomes central park', 'lumiere boulevard', 'glory heights'],
        categoryType: [
            {
                icon: {
                    src: '/image',
                    alt: '',
                },
                title: 'Phân xưởng',
            },
            // Admin tự chọn được loại hình, em muốn admin chỉ chọn được tối đa 5 cái(categoryType.length<=5)
        ],
        phoneNumber: '0637 858 974',
    },
    section1: {
        subTitle: 'CÂU CHUYỆN THƯƠNG HIỆU',
        title: 'Chúng Tôi Là Ai',
        description:
            'Công ty Cổ phần bất động sản Kangnam là đơn vị môi giới bất động sản chuyên nghiệp, chuyên phân phối đa dạng các phân khúc bất động sản trải dài khắp miền Bắc và miền Trung với đội ngũ chuyên viên môi giới giày dạn kinh nghiệm được đào tạo bài bản',
        background: {
            src: '/image',
            alt: '',
        },
        service: [
            {
                icon: {
                    src: '/image',
                    alt: '',
                },
                title: 'Phân xưởng',
            },
            //em muốn admin chỉ thêm được tối đa 3 cái (service.length<=3)
        ],
    },
    section2: {
        title: 'Dự án của chúng tôi',
        filter: [
            {
                title: 'Loại hình',
                type: ['Nhà mặt phố', 'Chung cư', 'Văn phòng', 'Phân xưởng', 'Đất nền'],
            },
            {
                title: 'Địa điểm',
                type: [
                    'Hà nội',
                    'Hà nam',
                    'TP. Hồ Chí Minh',
                    'Nghệ An',
                    'Quảng Ninh',
                    'Hà Tĩnh',
                    'Sơn La',
                    'Đắk Lắk',
                    'Lâm Đồng',
                    'Ninh Thuận',
                ],
            },
            {
                title: 'Cho thuê',
                type: [
                    'Thuê căn hộ',
                    'Thuê Sinh Viên',
                    'Thuê nhà phố',
                    'Thuê Studio',
                    'Thuê đất nền',
                    'Thuê Office-tel',
                ],
            },
            {
                title: 'Mua lại',
                type: ['Căn hộ', 'Nhà phố', 'Đất nền', 'Studio', 'Sinh Viên', 'Office-tel'],
            },
        ],
        //cần có api danh sách dự án và map
    },
    section3: {
        backgroundImage: {
            src: '/image',
            alt: '',
        },
        title: 'Kí gửi nhà đất',
        description:
            'Chúng tôi cung cấp dịch vụ kí gửi bất động sản, đáp ứng nhu cầu bán hoặc cho thuê tài sản của quý khách.',
        criteria: [
            {
                icon: {
                    src: '/image',
                    alt: '',
                },
                title: 'Đặt khách hàng làm trọng tâm',
            },
            //em muốn admin chỉ thêm được tối đa 3 cái (criteria.length<=3)
        ],
    },
    section4: {
        subTitle: 'Tổng hợp các dự án',
        title: 'Dự án nổi bật',
        backgroundImage: {
            src: '/image',
            alt: '',
        },
        listProjectSetOff: [], //danh sách các dự án mà admin chọn
    },
    section5: {
        backgroundImage: {
            src: '/image',
            alt: '',
        },
        title: 'Nổi bật theo khu vực',
    },
    section6: {
        backgroundImage: {
            src: '/image',
            alt: '',
        },
        subTitle: 'Tổng hợp các dự án',
        title: 'Đối tác của chúng tôi',
        listPartner: [{ src: '', alt: '' }],
    },
    section7: {
        subTitle: 'Tổng hợp các dự án',
        title: 'Tin tức mới nhất',
        //cần có api danh sách tin tức
    },
    footer: {
        logo: {
            src: '/image',
            alt: '',
        },
        socialMedia: {
            KakaoTalk: {
                link: '',
            },
            weChat: {
                link: '',
            },
            zalo: {
                link: '',
            },
            telegram: {
                link: '',
            },
            skype: {
                link: '',
            },
            linkedin: {
                link: '',
            },
        },
        contact: {
            address: 'Villa e11, The Manor, KĐT mới Mỹ Đình - Mễ Trì, Nam từ Liêm, Hà Nội',
            numberPhone1: '0637 858 974',
            numberPhone2: '0337 858 892',
            numberPhone3: '0837 858 357',
        },
        copyRight: '© 2023 Copyright. Powered by OKHUB Viet Nam',
    },
}
