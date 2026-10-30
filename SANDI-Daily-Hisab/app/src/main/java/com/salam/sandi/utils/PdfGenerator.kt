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
    fun generateDailyVoucherPdf(context: Context, voucher: VoucherEntity, isSlipFormat: Boolean): File {
        val pdfDocument = PdfDocument()
        val width = if (isSlipFormat) 250 else 595
        val height = if (isSlipFormat) 500 else 842
        val pageInfo = PdfDocument.PageInfo.Builder(width, height, 1).create()
        val page = pdfDocument.startPage(pageInfo)
        val canvas: Canvas = page.canvas
        val paint = Paint()

        paint.color = Color.WHITE
        canvas.drawRect(0f, 0f, width.toFloat(), height.toFloat(), paint)

        // Header
        paint.color = Color.rgb(11, 19, 41)
        paint.textSize = if (isSlipFormat) 14f else 22f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("SANDI AUTO EASY BIKE", 20f, 40f, paint)

        paint.textSize = if (isSlipFormat) 9f else 12f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        canvas.drawText("Company: Sandi | Owner: Abdus Salam (01620230864)", 20f, 60f, paint)
        canvas.drawText("Daily Voucher: " + voucher.voucherNumber + " | Date: " + voucher.date, 20f, 80f, paint)

        // Divider
        paint.strokeWidth = 1f
        paint.color = Color.LTGRAY
        canvas.drawLine(20f, 95f, (width - 20).toFloat(), 95f, paint)

        // Summary
        paint.color = Color.BLACK
        paint.textSize = if (isSlipFormat) 10f else 14f
        canvas.drawText("Total Day Income: BDT " + (voucher.totalIncomePoisha / 100.0), 20f, 125f, paint)
        canvas.drawText("Total Day Expense: BDT " + (voucher.totalExpensePoisha / 100.0), 20f, 150f, paint)

        // Net Profit
        paint.color = Color.rgb(245, 158, 11)
        paint.textSize = if (isSlipFormat) 13f else 18f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
        canvas.drawText("Net Profit / Cash: BDT " + (voucher.netProfitPoisha / 100.0), 20f, 190f, paint)

        // Signature
        paint.color = Color.DKGRAY
        paint.textSize = if (isSlipFormat) 9f else 11f
        paint.typeface = Typeface.create(Typeface.DEFAULT, Typeface.NORMAL)
        canvas.drawText("Proprietor Signature: Abdus Salam", 20f, 230f, paint)
        canvas.drawText("Thank you for choosing SANDI Auto Easy Bike!", 20f, 260f, paint)

        pdfDocument.finishPage(page)

        val outputFile = File(context.cacheDir, "daily_voucher_" + voucher.voucherNumber + ".pdf")
        val outputStream = FileOutputStream(outputFile)
        pdfDocument.writeTo(outputStream)
        pdfDocument.close()
        outputStream.close()

        return outputFile
    }
}
