package net.wyun.qys.util;

import org.exoplatform.ecm.utils.text.Text;

import com.ibm.icu.text.Transliterator;

public class Util {
	

	  /** Return name after cleaning
	   * @param fileName file name
	   * @return cleaned name
	   */
	  public static String cleanNameUtil(String fileName) {
	    Transliterator accentsconverter = Transliterator.getInstance("Latin; NFD; [:Nonspacing Mark:] Remove; NFC;");
	    if (fileName.indexOf('.') > 0) {
	      String ext = fileName.substring(fileName.lastIndexOf('.'));
	      fileName = accentsconverter.transliterate(fileName.substring(0, fileName.lastIndexOf('.'))).concat(ext);
	    } else {
	      fileName = accentsconverter.transliterate(fileName);
	    }
	    return Text.escapeIllegalJcrChars(fileName);

	  }
	  

}
