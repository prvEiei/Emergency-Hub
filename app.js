let emergencyData = [];


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
                    กรุณาเปิดเว็บไซต์ผ่าน Live Server
                </p>

            </div>

        `;

    }

}


/* =========================
   CATEGORY
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


    categories.forEach(
        function (category) {

            const option =
                document.createElement(
                    "option"
                );


            option.value = category;

            option.textContent = category;


            select.appendChild(option);

        }
    );

}


/* =========================
   DISPLAY DATA
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
                    text.includes(search) &&
                    (
                        category === "" ||
                        item.category === category
                    ) &&
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


            card.className = "card";


            card.style.animationDelay =
                (index * 0.04) + "s";


            let typeClass =
                "tag-government";


            if (
                item.type === "เอกชน"
            ) {

                typeClass =
                    "tag-private";

            }


            card.innerHTML = `

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

            `;


            container.appendChild(card);

        }
    );

}


/* =========================
   STATISTICS
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
   START
========================= */

loadData();