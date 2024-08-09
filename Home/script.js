function showProducts(section) {
    // Hide all product sections
    var productSections = document.querySelectorAll('.products');
    productSections.forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the selected product section
    var selectedSection = document.getElementById(section);
    if (selectedSection) {
        selectedSection.style.display = 'grid';
    }
}
