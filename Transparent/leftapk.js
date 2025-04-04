// OnFileText = document.querySelector('textarea.editor'); // from switch files.js


document.getElementById('shareBtn').addEventListener('click', async () => {
    const textAreaContent = OnFileText.value;

    // Check if the Web Share API is supported
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Shared file',
                text: textAreaContent,
                url: window.location.href, // Optional: include current page URL
            });
            // alert('Content shared successfully!');
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        // Fallback for unsupported browsers
        alert('Your browser does not support the Web Share API.');
    }
});


document.getElementById('reset').addEventListener('click', () => {
   document.querySelectorAll('.DivtextAr > textarea').forEach(ed=>{
       ed.value = "";
    })
});



document.getElementById('copyBtn').addEventListener('click', async () => {
    const textAreaContent = OnFileText.value;

    try {
        // Use Clipboard API to copy the content
        await navigator.clipboard.writeText(textAreaContent);
        alert('file copied !');
    } catch (error) {
        console.error('Error copying text:', error);
        alert('Failed to copy content. Please try again.');
    }
});



document.getElementById('downloadBtn').addEventListener('click', () => {
    const textAreaContent = OnFileText.value;

    // Create a Blob from the text content
    const blob = new Blob([textAreaContent], { type: 'text/html' });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute with a filename
    link.download = 'content.' + `${OnFileText.name}`;

    // Create a URL for the Blob and set it as the href attribute
    link.href = URL.createObjectURL(blob);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the Blob URL
    URL.revokeObjectURL(link.href);
});


document.querySelector('#feedbackBtn').addEventListener('click', () => {

    document.querySelector('.rateingContainer').style.display = 'flex';
});

document.querySelector('.Ms-Submit').addEventListener('click', () => {

    document.querySelector('.rateingContainer').style.display = 'none';
    alert("Thanks for feedback...!");

}); 

document.querySelector('.Ms-Canc').addEventListener('click', () => {

    document.querySelector('.rateingContainer').style.display = 'none';

});

