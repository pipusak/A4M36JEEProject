/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package semestralwork.exceptions;

/**
 *
 * @author Ondrej Suchy
 */
public class ConflictException extends Exception {

    /**
     * Creates a new instance of <code>CannotAddResource</code> without detail
     * message.
     */
    public ConflictException() {
    }

    /**
     * Constructs an instance of <code>CannotAddResource</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public ConflictException(String msg) {
        super(msg);
    }
}
