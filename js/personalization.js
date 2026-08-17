// ========================================
// PERSONALIZED BIRTHDAY SYSTEM
// ========================================

(function () {

    const params = new URLSearchParams(
        window.location.search
    );


    // ========================================
    // GET INFORMATION FROM LINK
    // ========================================

    const name = params.get("name");
    const day = params.get("day");
    const month = params.get("month");
    const year = params.get("year");
    const relationship = params.get("relationship");


    // ========================================
// CHECK PERSONALIZED LINK
// ========================================

const hasPersonalizedLink =
    name &&
    day &&
    month &&
    year &&
    relationship;


// ========================================
// NORMAL INTRO PAGE
// ========================================

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


if (
    currentPage === "intro.html" &&
    !hasPersonalizedLink
) {

    localStorage.removeItem(
        "birthdayPersonalData"
    );

    return;

}


// ========================================
// SAVE INFORMATION FROM LINK
// ========================================

if (hasPersonalizedLink) {

    localStorage.setItem(
        "birthdayPersonalData",
        JSON.stringify({
            name,
            day,
            month,
            year,
            relationship
        })
    );

}


// ========================================
// GET SAVED INFORMATION
// ========================================

let person = null;

try {

    person = JSON.parse(
        localStorage.getItem(
            "birthdayPersonalData"
        )
    );

} catch {

    person = null;

}


// No personalized information
if (!person) {
    return;
}
    // ========================================
    // GET SAVED INFORMATION
    // ========================================

    let person = null;

    try {

        person = JSON.parse(
            localStorage.getItem(
                "birthdayPersonalData"
            )
        );

    } catch {

        person = null;

    }


    // No personalized information
    if (!person) {
        return;
    }


    // ========================================
    // CREATE BIRTH DATE
    // ========================================

    const birthDate = new Date(
        Number(person.year),
        Number(person.month) - 1,
        Number(person.day)
    );


    if (Number.isNaN(birthDate.getTime())) {
        return;
    }


    // ========================================
    // CALCULATE AGE
    // ========================================

    const today = new Date();

    let age =
        today.getFullYear() -
        birthDate.getFullYear();


    const birthdayThisYear = new Date(
        today.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );


    if (today < birthdayThisYear) {
        age--;
    }


    // ========================================
    // CALCULATE WEEKDAY
    // ========================================

    const weekday =
        birthDate.toLocaleDateString(
            undefined,
            {
                weekday: "long"
            }
        );


    // ========================================
    // FULL DATE
    // Example: 17 April 2003
    // ========================================

    const fullDate =
        birthDate.toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    // ========================================
    // SHORT DATE
    // Example: 17 April
    // ========================================

    const shortDate =
        birthDate.toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "long"
            }
        );


    // ========================================
    // PERSONALIZATION DATA
    // ========================================

    const data = {

        name: person.name,

        age: age,

        day: person.day,

        month: person.month,

        year: person.year,

        relationship:
            person.relationship,

        weekday: weekday,

        date: fullDate,

        shortDate: shortDate

    };


    // ========================================
    // REPLACE NAME
    // ========================================

    document
        .querySelectorAll("[data-person-name]")
        .forEach(element => {

            element.textContent =
                data.name;

        });


    // ========================================
    // REPLACE AGE
    // ========================================

    document
        .querySelectorAll("[data-person-age]")
        .forEach(element => {

            element.textContent =
                data.age;

        });


    // ========================================
    // REPLACE FULL DATE
    // ========================================

    document
        .querySelectorAll("[data-person-date]")
        .forEach(element => {

            element.textContent =
                data.date;

        });


    // ========================================
    // REPLACE SHORT DATE
    // ========================================

    document
        .querySelectorAll("[data-person-short-date]")
        .forEach(element => {

            element.textContent =
                data.shortDate;

        });


    // ========================================
    // REPLACE WEEKDAY
    // ========================================

    document
        .querySelectorAll("[data-person-weekday]")
        .forEach(element => {

            element.textContent =
                data.weekday;

        });


    // ========================================
    // REPLACE RELATIONSHIP
    // ========================================

    document
        .querySelectorAll("[data-person-relationship]")
        .forEach(element => {

            element.textContent =
                data.relationship;

        });


    // ========================================
    // REPLACE DAY
    // ========================================

    document
        .querySelectorAll("[data-person-day]")
        .forEach(element => {

            element.textContent =
                data.day;

        });


    // ========================================
    // REPLACE MONTH
    // ========================================

    document
        .querySelectorAll("[data-person-month]")
        .forEach(element => {

            element.textContent =
                data.month;

        });


    // ========================================
    // REPLACE YEAR
    // ========================================

    document
        .querySelectorAll("[data-person-year]")
        .forEach(element => {

            element.textContent =
                data.year;

        });


    // ========================================
    // PAGE TITLE
    // ========================================

    document.title =
        `Happy Birthday, ${data.name} 🎂`;


    // ========================================
    // HIDE CREATE LINK FROM RECIPIENT
    // ========================================

    const createLinkButton =
        document.getElementById(
            "createLinkButton"
        );

    if (createLinkButton) {

        createLinkButton.style.display =
            "none";

    }


    const linkGenerator =
        document.getElementById(
            "linkGenerator"
        );

    if (linkGenerator) {

        linkGenerator.style.display =
            "none";

    }


    // ========================================
    // GLOBAL ACCESS
    // ========================================

    window.birthdayPerson = data;

})();