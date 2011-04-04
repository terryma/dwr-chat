package com.terryma.chatchat;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

public class ChatChatContextListener implements ServletContextListener {

    private ServletContext      ctx;
    private final static String EMOTICON_LINKS = "emoticon_links";
    private final static Logger logger         = Logger.getLogger(ChatChatContextListener.class);

    public void contextDestroyed(final ServletContextEvent arg0) {
    }

    public void contextInitialized(final ServletContextEvent event) {
        ctx = event.getServletContext();
        final List<String> imageNames = findImageNames();
        ctx.setAttribute(EMOTICON_LINKS, imageNames);
    }

    protected List<String> findImageNames() {
        // FIXME: jesus, this shows how much i don't understand about resource loading
        final URL url = getClass().getResource("/../../resources/images");
        logger.info("url=" + url.getPath());
        URI uri = null;
        try {
            uri = url.toURI();
            logger.info("uri=" + uri.getPath());
        } catch (final URISyntaxException e) {
            logger.error(e);
            e.printStackTrace();
        }
        // retrieve and insert the emoticon links
        final File image_dir = new File(uri);
        final String[] images = image_dir.list();
        final List<String> imageNames = new ArrayList<String>();
        for (final String image : images) {
            logger.info("imageName=" + image);
            imageNames.add(image);
        }
        return imageNames;
    }

    public static void main(final String args[]) {
        final ChatChatContextListener listener = new ChatChatContextListener();
        listener.findImageNames();
    }
}
