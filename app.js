let emergencyData = [];


/* =========================
   รูปภาพตามหมวดหมู่
========================= */

const categoryImages = {

    "ตำรวจ":
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80",

    "การแพทย์":
        "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&w=1000&q=80",

    "ดับเพลิงและกู้ภัย":
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",

    "ท่องเที่ยว":
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1000&q=80",

    "สาธารณภัย":
        "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1000&q=80",

    "ทางน้ำและทางทะเล":
        "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1000&q=80",

    "สุขภาพจิต":
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",

    "สาธารณสุข":
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",

    "ประกันสังคม":
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80",

    "เทคโนโลยี":
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",

    "การเดินทาง":
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",

    "หน่วยงานท้องถิ่น":
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
    
    "สังคม":
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",

    "สาธารณูปโภค":
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=80",

    "หน่วยงานภาครัฐ":
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",

    "กู้ภัย":
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80",

    "ยานพาหนะ":
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80"

};


/* =========================
   โหลดข้อมูล
========================= */

async function loadData() {

    const container =
        document.getElementById(
            "dataContainer"
        );


    try {

        const response =
            await fetch("data.json");


        if (!response.ok) {

            throw new Error(
                "ไม่สามารถโหลดข้อมูล"
            );

        }


        emergencyData =
            await response.json();


        createCategoryList();

        displayData();

        updateStats();


    } catch (error) {

        console.error(error);


        container.innerHTML = `

            <div class="empty-card">

                <div class="empty-card-icon">
                    ⚠️
                </div>

                <h3>
                    ไม่สามารถโหลดข้อมูลได้
                </h3>

                <p>
                    กรุณาตรวจสอบไฟล์ data.json
                </p>

            </div>

        `;

    }

}


/* =========================
   สร้างรายการหมวดหมู่
========================= */

function createCategoryList() {

    const categories = [];


    emergencyData.forEach(
        function (item) {

            if (
                item.category &&
                !categories.includes(
                    item.category
                )
            ) {

                categories.push(
                    item.category
                );

            }

        }
    );


    categories.sort();


    const select =
        document.getElementById(
            "categoryFilter"
        );


    select.innerHTML = `
        <option value="">
            ทุกหมวดหมู่
        </option>
    `;


    categories.forEach(
        function (category) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                category;

            option.textContent =
                category;


            select.appendChild(
                option
            );

        }
    );

}


/* =========================
   แสดงข้อมูล
========================= */

function displayData() {

    const container =
        document.getElementById(
            "dataContainer"
        );


    const resultInfo =
        document.getElementById(
            "resultInfo"
        );


    const search =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase()
            .trim();


    const category =
        document.getElementById(
            "categoryFilter"
        ).value;


    const type =
        document.getElementById(
            "typeFilter"
        ).value;


    const result =
        emergencyData.filter(
            function (item) {

                const text =
                    (
                        item.number +
                        " " +
                        item.name +
                        " " +
                        item.category +
                        " " +
                        item.type +
                        " " +
                        item.description
                    )
                        .toLowerCase();


                return (

                    text.includes(search)

                    &&

                    (
                        category === "" ||
                        item.category === category
                    )

                    &&

                    (
                        type === "" ||
                        item.type === type
                    )

                );

            }
        );


    container.innerHTML = "";


    resultInfo.textContent =
        `พบข้อมูล ${result.length} รายการ`;


    if (result.length === 0) {

        container.innerHTML = `

            <div class="empty-card">

                <div class="empty-card-icon">
                    🔍
                </div>

                <h3>
                    ไม่พบข้อมูล
                </h3>

                <p>
                    ลองเปลี่ยนคำค้นหาหรือหมวดหมู่
                </p>

            </div>

        `;

        return;

    }


    result.forEach(
        function (item, index) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "card";


            card.style.animationDelay =
                (index * 0.04) + "s";


            /*
                เลือกรูปตามหมวดหมู่
                ถ้าไม่มีรูป จะใช้รูปสำรอง
            */

            const image =
                categoryImages[item.category]
                ||
                "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80";


            card.style.setProperty(
                "--card-image",
                `url("${image}")`
            );


            let typeClass =
                "tag-government";


            if (
                item.type === "เอกชน"
            ) {

                typeClass =
                    "tag-private";

            }


            card.innerHTML = `

                <div class="card-image">

                    <div class="card-image-overlay">

                        <span class="image-icon">
                            ${getCategoryIcon(item.category)}
                        </span>

                    </div>

                </div>


                <div class="card-content">

                    <a
                        class="card-number"
                        href="tel:${item.number}"
                    >
                        ${item.number}
                    </a>


                    <h3>
                        ${item.name}
                    </h3>


                    <div class="card-tags">

                        <span class="tag">
                            ${item.category}
                        </span>


                        <span class="tag ${typeClass}">
                            ${item.type}
                        </span>

                    </div>


                    <p class="card-description">
                        ${item.description}
                    </p>


                    <p class="card-source">
                        แหล่งข้อมูล:
                        ${item.source || "-"}
                    </p>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================
   ไอคอนแต่ละหมวด
========================= */

function getCategoryIcon(category) {

    const icons = {

        "ตำรวจ": "🚓",

        "การแพทย์": "🚑",

        "ดับเพลิงและกู้ภัย": "🚒",

        "ท่องเที่ยว": "🧳",

        "สาธารณภัย": "🆘",

        "ทางน้ำและทางทะเล": "🚤",

        "สุขภาพจิต": "🧠",

        "สาธารณสุข": "🏥",

        "ประกันสังคม": "📋",

        "เทคโนโลยี": "💻",

        "การเดินทาง": "🚌",

        "หน่วยงานท้องถิ่น": "🏛️"

    };


    return icons[category] || "☎️";

}


/* =========================
   สถิติ
========================= */

function updateStats() {

    const categories = [];


    emergencyData.forEach(
        function (item) {

            if (
                item.category &&
                !categories.includes(
                    item.category
                )
            ) {

                categories.push(
                    item.category
                );

            }

        }
    );


    document.getElementById(
        "totalNumbers"
    ).textContent =
        emergencyData.length;


    document.getElementById(
        "totalCategories"
    ).textContent =
        categories.length;

}


/* =========================
   เริ่มต้น
========================= */

loadData();