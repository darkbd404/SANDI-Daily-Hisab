package com.salam.sandi.utils

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Typeface
import android.graphics.pdf.PdfDocument
import com.salam.sandi.data.entity.VoucherEntity
import java.io.File
import java.io.FileOutputStream

object PdfGenerator {
    fun generateVoucherPdf(context: Context, voucher: VoucherEntity, isSlipFormat: Boolean): File {
        val pdfDocument = PdfDocument()
        val width = if (isSlipFormat) 250 else 595
        val height = if (isSlipFormat) 400 else 842
        val pageInfo = PdfDocument.PageInfo.Builder(width, height, 1).create()
        val page = pdfDocument.startPage(pageInfo)
        val canvas: Canvas = page.canvas
        val paint = Paint()

        // Background
        paint.color = Color.WHITE
        canvas.drawRect(0f, 0f, width.toFloat(), height.toFloat(), paint)

        // Header Title
        paint.color = Color.rgb(15, 23, 42) // Dark Navy
        paint.textSize = if (isSlipFormat) 14f else 22f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("SANDI AUTO EASY BIKE", 20f, 40f, paint)

        paint.textSize = if (isSlipFormat) 9f else 12f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        canvas.drawText("Owner: Abdus Salam | Phone: 01620230864", 20f, 60f, paint)
        canvas.drawText("Voucher No: " + voucher.voucherNumber, 20f, 80f, paint)
        canvas.drawText("Date: " + voucher.date + " " + voucher.time, 20f, 95f, paint)

        // Line
        paint.strokeWidth = 1f
        paint.color = Color.LTGRAY
        canvas.drawLine(20f, 105f, (width - 20).toFloat(), 105f, paint)

        // Details
        paint.color = Color.BLACK
        paint.textSize = if (isSlipFormat) 10f else 14f
        canvas.drawText("Type: " + voucher.type, 20f, 130f, paint)
        canvas.drawText("Category: " + voucher.category, 20f, 150f, paint)
        canvas.drawText("Description: " + voucher.description, 20f, 170f, paint)
        canvas.drawText("Payment Method: " + voucher.paymentMethod, 20f, 190f, paint)

        // Amount Box
        paint.color = Color.rgb(217, 119, 6) // Gold accent
        paint.textSize = if (isSlipFormat) 14f else 20f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        val taka = voucher.amountPoisha / 100.0
        canvas.drawText("Total: BDT " + taka + " Taka", 20f, 230f, paint)

        // Footer Thank you
        paint.color = Color.DKGRAY
        paint.textSize = if (isSlipFormat) 8f else 10f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.ITALIC)
        canvas.drawText("Thank you for using SANDI Auto Easy Bike!", 20f, 270f, paint)

        pdfDocument.finishPage(page)

        val outputFile = File(context.cacheDir, "voucher_" + voucher.voucherNumber + ".pdf")
        val outputStream = FileOutputStream(outputFile)
        pdfDocument.writeTo(outputStream)
        pdfDocument.close()
        outputStream.close()

        return outputFile
    }
}
