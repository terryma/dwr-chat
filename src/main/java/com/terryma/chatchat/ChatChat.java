package com.terryma.chatchat;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import org.apache.log4j.Logger;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.proxy.dwr.Util;

public class ChatChat {

    static int                 numInstances = 0;
    Logger                     logger       = Logger.getLogger(getClass());
    private final List<String> names        = new ArrayList<String>();
    private final List<String> messages     = new LinkedList<String>();

    /**
     * Number of messages to keep on the server
     */
    private static final int   MAX_MESSAGES = 2000;

    public ChatChat() {
        numInstances++;
    }

    /**
     * Remoted with DWR
     * 
     * @param message
     */
    public void sendMessage(final String message) {
        logger.info("received message:" + message);
        messages.add(message);
        if (messages.size() > MAX_MESSAGES) {
            messages.remove(0);
        }
        final Util util = retrieveSessions(false);
        util.addFunctionCall("update", message);
    }

    public void getStates() {
        final WebContext wctx = WebContextFactory.get();
        final Util util = new Util(wctx.getScriptSession());
        util.addFunctionCall("updateAll", messages);
        util.addFunctionCall("updatePeople", names);
    }

    /**
     * Remoted with DWR
     * 
     * @param name
     */
    public void registerName(final String name) {
        names.add(name);
        final Util util = retrieveSessions(true);
        util.addFunctionCall("updatePeople", names);
    }

    /**
     * Remoted with DWR
     * 
     * @param name
     */
    public void unregisterName(final String name) {
        names.remove(name);

        final Util util = retrieveSessions(true);
        util.addFunctionCall("updatePeople", names);
    }

    private Util retrieveSessions(final boolean includeSenderSession) {
        logger.info("Number of ChatChat instances = " + numInstances);
        final WebContext wctx = WebContextFactory.get();

        // Get the current page that started this request
        final Collection sessions = wctx.getAllScriptSessions();
        if (!includeSenderSession) {
            // remove the sending browser since we don't need to broadcast the message back to it
            sessions.remove(wctx.getScriptSession());
        }
        return new Util(sessions);
    }
}
