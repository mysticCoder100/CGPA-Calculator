export function CompleteProfile() {
	let section = $(`
        <div class="completeProfile">
            <div class="completeProfile__info">
                <h4> Complete Your  Profile </h4>
                <h6>Kindly Proceed to the settings page to complete your profile by filling the required field at the application setup tab. Thank you</h6>
            </div>
        </div>
    `);

	return section;
}

export function Graduated({ gpa, cgpa }) {
	let section = $(`
    <div class="completeProfile">
        <div class="completeProfile__info">
            <h4> Congratulations !!!! </h4>
            <h6> You've Graduated with a GPA of ${gpa} and a CGPA of ${cgpa} </h6>
        </div>
    </div>
`);

	return section;
}
