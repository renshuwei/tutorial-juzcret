package net.wyun.list.comparator;


import java.util.Comparator;

import net.wyun.list.bean.File;

/**
 * Created with IntelliJ IDEA.
 * User: benjamin
 * Date: 08/02/13
 * Time: 17:00
 * To change this template use File | Settings | File Templates.
 */
public class FileDateComparator implements Comparator<File> {
  public int compare(File file, File file2) {
    return file.getCreatedDateAsDate().compareTo(file2.getCreatedDateAsDate());
  }
}
