import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Certificate.css';


const Certificate = () => {
   const generatePDF = () => {
     const input = document.getElementById('certificate');
 
     html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const yOffset = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;
  
      pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
      pdf.save('certificate.pdf');
    });
  };
    
   return (
      <>
      <div className="container-certificate"id="certificate">

         <div className="pm-certificate-border">
            <div className="pm-certificate-header">
               <div className="pm-certificate-title">
                  <h2>Lernova Certificate of Completion course</h2>
               </div>
            </div>

            <div className="pm-certificate-body">
               <div className="content-certificate">
                  <div className="pm-certificate-name">
                     <span className="pm-name-text">Wafik Safa</span>
                     <hr className='pm-name-under' />
                  </div>
               </div>

               <div className="content-certificate">
                  <div className="pm-earned">
                     <span className="pm-earned-text">Has Earned The certificate</span>
                     <span className="pm-credits-text"><p>With All Due Respect And Merit </p></span>
                     <span className="pm-credits-date"><p>on September 19, 2023</p></span>
                     <span className="pm-earned-text">While Completing The Training Course Entitled</span>
                  </div>
               </div>

               <div className="content-certificate">
                  <div className="pm-course-title">
                     <span className="pm-credits-course">HTML</span>
                     <hr className='pm-name-under' />
                  </div>
               </div>
            </div>

            <div className="content-certificate">
               <div className="pm-certificate-footer">
                  <div className="first-signature">
                     <span className="pm-credits-dire">Learnova Director Signature:</span>
                     <span className="pm-first-sig"><p>Lernova.Director</p></span>
                     <hr className='dm-name-under' />
                  </div>
                  <div className="second-signature">
                     <span className="pm-credits-inst">Instructor Signature:</span>
                     <span className="pm-second-sig"><p>Instructor</p></span>
                     <hr className='dm-name-under' />
                  </div>
                  </div>
                  <div className="date-certificate">
                  <span className="pm-date"></span>
                  </div>
            </div>
         </div>

      </div>
      <button onClick={generatePDF} className="download-button">
          Download Certificate
        </button>
      </>
   )
};

export default Certificate;
